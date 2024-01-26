import { Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tabs, Tab } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import TodoItem from './TodoItem'

interface Item {
  id: string,
  title: string,
  description: string,
  done: boolean,
}

export default function Dashboard() {

  const [itemsArray, setItemsArray] = useState([])
  const [newItem, setNewItem] = useState<Item>({
    id: '',
    title: '',
    description: '',
    done: false,
  })
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const currentProgress = itemsArray.length === 0 ? 100 : (itemsArray.filter(item => item.done).length / itemsArray.length) * 100
    setProgress(currentProgress)
  }, [itemsArray])

  const [todoFilter, setTodoFilter] = useState('all')
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  function handleChange(e) {
    const {name, value} = e.target

    setNewItem((prevData) => ({
      ...prevData,
      id: nanoid(),
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setNewItem({
      id: '',
      title: '',
      description: '',
      done: false,
    })
    return setItemsArray(prevItems => [...prevItems, newItem])
  }

  function deleteItem(e, itemId) {
    setItemsArray(oldData => oldData.filter(item => item.id !== itemId))
  }

  function setDone(id) {
    setItemsArray(oldData => oldData.map(item => {
      return item.id === id ? {...item, done: !item.done} : item
    }))
  }

  const todoItems = todoFilter === "done" ? itemsArray.filter(item => item.done === true) : todoFilter === "incomplete" ? itemsArray.filter(item => item.done === false) : itemsArray
  const renderItems = todoItems.map(item => {
    return (
      <TodoItem 
        key={item.id}
        title={item.title}
        description={item.description}
        done={item.done}
        deleteItem={() => deleteItem(Event, item.id)}
        setDone={() => setDone(item.id)}
      />
    )
  })

  return (
    <div className="w-4/6 mx-auto mt-4 flex flex-col gap-4">
      <Progress size="md" radius="sm" label="Overall Progress:" value={progress} showValueLabel={true} className="text-gray-100" />
      <div>
        <Button id="newItemButton" color="success" onPress={onOpen}>New Item</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>New Item</ModalHeader>
                <ModalBody>
                  <Input autoFocus label="Title" placeholder="Enter a title" type="text" variant="bordered" name="title" value={newItem.title} onChange={handleChange} />
                  <Textarea label="Description" placeholder="Enter a description" type="text" variant="bordered" name="description" value={newItem.description} onChange={handleChange} />
                </ModalBody>
                <ModalFooter className="flex flex-row justify-between">
                  <Button color="danger" onPress={onClose}>Close</Button>
                  <Button id="saveButton" color="success" onPress={onClose} type="submit">Save</Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>          
        </Modal>
      </div>
      <div className="flex justify-center">
        <Tabs onSelectionChange={(key: React.Key) => setTodoFilter(key.toString())}>
          <Tab id="tab1" key="all" title="All" />
          <Tab id="tab2" key="incomplete" title="Incomplete" />
          <Tab id="tab3" key="done" title="Done" />
        </Tabs>
      </div>
      <div className="grid grid-cols-4 gap-3">{renderItems}</div>
    </div>
  )
}
