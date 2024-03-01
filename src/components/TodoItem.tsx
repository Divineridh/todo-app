import { Divider, Button, Checkbox, Card, CardHeader, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import EditIcon from '../assets/editIcon.png'
import DeleteIcon from '../assets/deleteIcon.png'
import Tag from '../assets/tag.png'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useState, useMemo, useEffect } from 'react'

interface propTypes {
    key: number,
    dropId: string,
    title: string,
    priority: string,
    description: string,
    done: boolean,
    deleteItem: () => void,
    setDone: () => void,
    setPriority: () => void,
    handleEdit: () => void,
    submitEdit: () => void,
}

export default function TodoItem(props: propTypes) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.dropId,
    })
    const style = {
        transform: CSS.Translate.toString(transform)
    }

    const [selectedKeys, setSelectedKeys] = useState(new Set([props.priority]))

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    )

    useEffect(() => {
        
    })

  return (
    <Card className="flex flex-col bg-zinc-800 text-gray-200 shadow-lg" style={style} {...listeners} {...attributes}>
        <CardHeader className="flex flex-row px-4 py-2 justify-between items-center">
            <span className="text-lg">{props.title}</span>
            <div className="flex flex-row">
                <Checkbox radius="sm" color="primary" defaultSelected={props.done} onChange={props.setDone} />
                <span className="text-sm">Done</span>
            </div>
        </CardHeader>
        <Divider className="bg-gray-500" />
        <CardBody className="h-40">
            <p className="px-2 text-sm">{props.description}</p>
        </CardBody>
        <Divider className="bg-gray-500" />
        <CardFooter className="flex justify-between">
            <Button isIconOnly color="success" size="sm" className="p-1" onPress={onOpen}><Image src={EditIcon} /></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={props.submitEdit}>
                            <ModalHeader>Edit Item</ModalHeader>
                            <ModalBody>
                                <Input autoFocus label="Title" placeholder="Enter a title" type="text" variant="bordered" name="title" defaultValue={props.title} onChange={props.handleEdit} />
                                <Textarea label="Description" placeholder="Enter a description" type="text" variant="bordered" name="description" defaultValue={props.description} onChange={props.handleEdit} />
                            </ModalBody>
                            <ModalFooter className="flex flex-row justify-between">
                                <Button color="danger" onPress={onClose}>Close</Button>
                                <Button id="saveButton" color="success" onPress={onClose} type="submit">Save</Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        radius="sm"
                        size="sm"
                        color={selectedValue === "low" ? "secondary" : selectedValue === "normal" ? "success" : selectedValue === "high" ? "warning" : "danger"}
                    >
                        Set Priority
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Priority selection"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    onAction={props.setPriority}
                    name="priority"
                >
                    <DropdownItem key="low">Low</DropdownItem>
                    <DropdownItem key="normal">Normal</DropdownItem>
                    <DropdownItem key="high">High</DropdownItem>
                    <DropdownItem key="urgent">Urgent</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button isIconOnly color="primary" size="sm" className="p-1"><Image src={Tag} /></Button>
            <Button isIconOnly color="danger" size="sm" className="p-1" onPress={props.deleteItem}><Image src={DeleteIcon} /></Button>
        </CardFooter>
    </Card>
  )
}
