import { Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tabs, Tab } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import axios from 'axios'

interface Item {
  title: string,
  priority: string,
  description: string,
  done: boolean,
  creationDate: Date,
  deleted: boolean,
  deletionDate: Date,
  tags: string[],
}


export default function Dashboard() {

  const date = new Date
  const [data, setData] = useState([])
  const [doneData, setDoneData] = useState([])
  const [incompleteData, setIncompleteData] = useState([])
  const [newItem, setNewItem] = useState<Item>({
    title: '',
    description: '',
    priority: 'normal',
    done: false,
    creationDate: date,
    deleted: false,
    deletionDate: date,
    tags: ['note'],
  })
  const [progress, setProgress] = useState(100)
  const [editItem, setEditItem] = useState<Item>({
    title: '',
    priority: 'low',
    description: '',
    done: false,
    creationDate: date,
    deleted: false,
    deletionDate: date,
    tags : ['note'],
  })
  const [todoFilter, setTodoFilter] = useState('all')
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  const fetchNotesFunction = () => {
    axios.get('https://localhost:7094/api/Notes')
      .then((response) => {
        const notesData = response.data
        setData(notesData)
      })
      .catch((error) => {
        console.error('Error fetching notes data: ', error)
      })
  }

  const fetchDoneNotesFunction = () => {
    axios.get('https://localhost:7094/api/Notes/done')
      .then((response) => {
        const data = response.data
        setDoneData(data)
      })
      .catch((error) => {
        console.error('Error fetching done notes data: ', error)
      })
  }

  const fetchIncompleteNotesFunction = () => {
    axios.get('https://localhost:7094/api/Notes/incomplete')
      .then((response) => {
        const data = response.data
        setDoneData(data)
      })
      .catch((error) => {
        console.error('Error fetching incomplete notes data: ', error)
      })
  }

  useEffect(() => {
    todoFilter === "all" ? fetchNotesFunction() :
    todoFilter === "done" ? fetchDoneNotesFunction() :
    fetchIncompleteNotesFunction()
  }, [todoFilter])

  //Web API stuff

  //Web API get notes
  useEffect(() => {
    fetchNotesFunction()
    fetchDoneNotesFunction()
    fetchIncompleteNotesFunction()
  }, [])

  //Web API add note
  const createNote = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    let newNote = {...newItem, creationDate: date}
    axios.post('https://localhost:7094/api/Notes', newNote)
      .then((response) => {
        console.log("Note created! ", response.data)
        fetchNotesFunction()
      })
      .catch((error) => {
        console.error("Note couldn't be created: ", error)
      })
  }


  //Web API delete note
  const deleteNote = (noteId: number) => {
    axios.delete(`https://localhost:7094/api/Notes/${noteId}`)
      .then((response) => {
        console.log("Note deleted! ", response)
        fetchNotesFunction()
      })
      .catch((error) => {
        console.error("Note couldn't be deleted: ", error)
      })
  }


  //Web API update note
  const updateNote = (e: Event, noteId: number) => {
    e.preventDefault()
    axios.put(`https://localhost:7094/api/Notes/${noteId}`, editItem)
    .then((response) => {
      console.log("Note updated! ", response)
      fetchNotesFunction()
    })
    .catch((error) => {
      console.error("Note couldn't be updated: ", error)
    })
  }

  //Web API change done state
  function setDone(noteId: number) {
    axios.get(`https://localhost:7094/api/Notes/${noteId}`)
      .then((response) => {
        let updatedNote = {...response.data, done: !response.data.done}

        axios.put(`https://localhost:7094/api/Notes/${noteId}`, updatedNote)
          .then((response) => {
            console.log("Note updated! ", response)
            fetchNotesFunction()
          })
          .catch((error) => {
            console.error("Note couldn't be updated: ", error)
          })
        })
    .catch((error) => {
      console.error("Note couldn't be fetched: ", error)
    })
  }



  //Web API stuff ends

  

  useEffect(() => {
    const currentProgress = data.length === 0 ? 100 : (doneData.length / data.length) * 100
    setProgress(currentProgress)
  }, [data])

  

  function handleChange(e) {
    const {name, value} = e.target

    setNewItem((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function handleEdit(e: Event) {
    const {name, value} = e.target
    
    setEditItem((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  

  function setPriority(id: number, newPriority: string) {
    axios.get(`https://localhost:7094/api/Notes/${id}`)
      .then((response) => {
        let updatedNote = {...response.data, priority: newPriority}

        axios.put(`https://localhost:7094/api/Notes/${id}`, updatedNote)
          .then((response) => {
            console.log("Priority updated! ", response)
            fetchNotesFunction()
          })
          .catch((error) => {
            console.error("Priority couldn't be updated: ", error)
          })
        })
    .catch((error) => {
      console.error("Note couldn't be fetched: ", error)
    })
  }

  const todoItems = todoFilter === "done" ? doneData : todoFilter === "incomplete" ? incompleteData : data
  const renderItems = todoItems.map((item: Item) => {
    return (
      <TodoItem 
        key={item.id}
        dropId="draggable"
        title={item.title}
        priority={item.priority}
        description={item.description}
        done={item.done}
        deleteItem={() => deleteNote(item.id)}
        setDone={() => setDone(item.id)}
        setPriority={(newPriority) => setPriority(item.id, newPriority)}
        handleEdit={(event) => handleEdit(event)}
        submitEdit={(event) => updateNote(event, item.id, item)}
      />
    )
  })

  const [parent, setParent] = useState(null)

  function handleDragEnd({over}) {
    setParent(over ? over.id : null)
  }

  return (
    <div className="w-5/6 mx-auto mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between text-gray-100">
          <span>Overall Progress:</span>
          <span>{data.length < 1 ? 0 : doneData.length/data.length*100}% ({doneData.length}/{data.length})</span>
        </div>
        <Progress size="md" radius="sm" value={progress} maxValue={data.length} className="text-gray-100" />
      </div>
      <div className="flex flex-row gap-4">
        <Button id="newItemButton" color="success" onPress={onOpen}>New Item</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={createNote}>
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
        <Button color="warning" onPress={updateNote}>Test axios put</Button>
      </div>
      <div className="flex justify-center">
        <Tabs onSelectionChange={(key: React.Key) => setTodoFilter(key.toString())}>
          <Tab id="tab1" key="all" title="All" />
          <Tab id="tab2" key="incomplete" title="Incomplete" />
          <Tab id="tab3" key="done" title="Done" />
        </Tabs>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {renderItems}
      </div>
    </div>
  )
}
