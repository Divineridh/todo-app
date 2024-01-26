import React from 'react'
import { Divider, Button, Modal, Checkbox, Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'
import EditIcon from '../assets/editIcon.png'
import DeleteIcon from '../assets/deleteIcon.png'

interface propTypes {
    key: string,
    title: string,
    description: string,
    done: boolean,
    deleteItem: () => void,
    setDone: () => void,
}

export default function TodoItem(props: propTypes) {
  return (
    <Card className="flex flex-col bg-zinc-800 text-gray-200 shadow-lg">
        <CardHeader className="flex flex-row px-4 py-2 justify-between items-center">
            <span className="text-lg">{props.title}</span>
            <div className="flex flex-row">
                <Checkbox color="primary" defaultSelected={props.done} onChange={props.setDone} />
                <span className="text-sm">Done</span>
            </div>
        </CardHeader>
        <Divider className="bg-gray-500" />
        <CardBody>
            <p className="px-2">{props.description}</p>
        </CardBody>
        <Divider className="bg-gray-500" />
        <CardFooter className="flex justify-between">
            <Button isIconOnly color="success" className="p-2"><Image src={EditIcon} /></Button>
            <Button isIconOnly color="danger" className="p-2"><Image src={DeleteIcon} /></Button>
        </CardFooter>
    </Card>
  )
}
