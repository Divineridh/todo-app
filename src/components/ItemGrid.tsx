import {useDroppable} from '@dnd-kit/core'

interface propTypes {
    id: string,
}

export default function ItemGrid(props: propTypes) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    })
    const style = {
        opacity: isOver ? 1 : 0.5,
    }

  return (
    <div className="grid grid-cols-4 gap-3" ref={setNodeRef} style={style}>

    </div>
  )
}
