export default function getColorMutation(parentBug, maxMutationStep) {
    return parentBug.color.map(colorGene => {
        const randStep = () => Math.floor(Math.random() * maxMutationStep) + 1
        const mutation = randStep() - randStep()
        return colorGene + mutation
    })
}
