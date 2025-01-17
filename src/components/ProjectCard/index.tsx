import { KeyboardEvent, MouseEvent, useContext, useRef, useState } from "react"
import { Project, ProjectsContext } from "../../contexts/projectsContext"
import { ProjectCardContainer, ProjectCardWrapper, LabelContainer, LabelInputContainer } from "./styles"

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const inputLabelRef = useRef<HTMLInputElement>()
    const inputLabelErrorRef = useRef<HTMLSpanElement>()
    const { addLabel, deleteLabel } = useContext(ProjectsContext);

    const [uploadingLabel, setUploadingLabel] = useState(false)
    const [deletingLabel, setDeletingLabel] = useState(false)
    const [deletingLabelIndex, setDeletingLabelIndex] = useState(0)

    async function handleLabelInput(event: KeyboardEvent<HTMLInputElement>) {
        setUploadingLabel(true)
        if (event.key === 'Enter') {
            const newLabel = inputLabelRef.current.value;
            const labels = [...project.labels]

            if (labels.indexOf(newLabel) !== -1) {
                inputLabelErrorRef.current.textContent = 'Using!'
                setTimeout(() => {
                    inputLabelErrorRef.current.textContent = ''
                }, 3000);
                setUploadingLabel(false)
                return;
            }

            labels.push(newLabel);
            const addedLabel = await addLabel(project.id, labels);
            if (addedLabel) {
                inputLabelRef.current.value = ''
            }
        }
        setUploadingLabel(false)
    }

    async function handleLabelDelete(event: MouseEvent<HTMLButtonElement>, selectedLabel: string, index: number) {
        setDeletingLabel(true)
        setDeletingLabelIndex(index)

        const labels = [...project.labels]
        const labelIndex = labels.indexOf(selectedLabel)
        await deleteLabel(project.id, labels, labelIndex)

        setDeletingLabel(false)
    }

    return (
        <ProjectCardWrapper>
            <ProjectCardContainer>
                <a href={project.html_url}>
                    <h3>{project.full_name}</h3>
                </a>
                <p>{project.description}</p>
                <LabelContainer>
                    <ul>
                        {project.labels.map((label, index) => (
                            <li key={index}>
                                <span>{label}</span>
                                <button
                                    onClick={(event) => handleLabelDelete(event, label, index)}
                                    disabled={deletingLabel && (deletingLabelIndex === index)}
                                ></button>
                            </li>
                        ))}
                    </ul>
                    <LabelInputContainer>
                        <input
                            name="label"
                            placeholder="+ Add label"
                            type="text"
                            ref={inputLabelRef}
                            onKeyDown={handleLabelInput}
                            disabled={uploadingLabel}
                        />
                        <span ref={inputLabelErrorRef}></span>
                    </LabelInputContainer>
                </LabelContainer>
            </ProjectCardContainer>
        </ProjectCardWrapper>
    )
}
