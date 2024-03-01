import { Card, CardBody, Tabs, Tab, Input, Link, Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

interface User {
    id: string,
    username: string,
    email: string,
    password: string,
}

interface LoginUser {
    username: string,
    password: string,
}

export default function Landing() {
    const [selected, setSelected] = useState("login")
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState<User>({
        id: '',
        username: '',
        email: '',
        password: '',
    })
    const [loginUser, setLoginUser] = useState<LoginUser>({
        username: '',
        password: ''
    })
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    function handleSignupChange(e) {
        const {name, value} = e.target

        console.log("user: " + newUser.username + " email: " + newUser.email + " pass: " + newUser.password)
        setNewUser((prevData) => ({
            ...prevData,
            id: nanoid(),
            [name]: value,
        }))
    }
    
    function handleSignup(event) {
        event.preventDefault()
        setNewUser({
            id: '',
            username: '',
            email: '',
            password: '',
          })
        console.log("new exito")
        return setUsers(prevItems => [...prevItems, newUser])
    } 
    
    
    function handleLoginChange(e) {
        const {name, value} = e.target
        console.log(users)
        setLoginUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        // users.map(item => {
        //     item.username === loginUser.username ?
        //     navigate('/dashboard') :
        //     navigate('/failed')

        // })
        navigate('/dashboard')
    } 


  return (
    <div className="flex flex-row w-screen h-screen">
        <div className="flex flex-col items-center w-9/12 bg-gradient-to-br from-purple-900 to-pink-900 shadow-2xl">
            <div className="flex flex-col mt-32 gap-4">
                <span className="text-5xl text-gray-100">Welcome to my landing page!</span>
                <span className="text-gray-100">This is just filler text to check whether the styling actually looks good or not. Log in to access the app, or register a new account if you don't have one already.</span>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-100 w-3/12">
            <Card className="w-[340px] h-[400px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="login" title="Login"> 
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Input  label="Username" placeholder="Enter your username" type="text" name="username" value={loginUser.username} onChange={handleLoginChange} />
                                <Input  label="Password" placeholder="Enter your password" type="password" name="password" value={loginUser.password} onChange={handleLoginChange} />
                                <span className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link className="hover: cursor-pointer" size="sm" onPress={() => setSelected("signup")}>Sign up</Link>
                                </span>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit" fullWidth color="primary">Login</Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="signup" title="Sign up">
                            <form onSubmit={handleSignup} className="flex flex-col gap-4 h-[300px]">
                                <Input isRequired label="Username" placeholder="Enter your username" type="text" name="username" value={newUser.username} onChange={handleSignupChange} />
                                <Input isRequired label="Email" placeholder="Enter your email" type="email" name="email" value={newUser.email} onChange={handleSignupChange} />
                                <Input isRequired label="Password" placeholder="Enter your password" type="password" name="password" value={newUser.password} onChange={handleSignupChange} />
                                <span className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link className="hover: cursor-pointer" size="sm" onPress={() => setSelected("login")}>Login</Link>
                                </span>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit" fullWidth color="primary" onPress={onOpen}>Sign up</Button>
                                    <Modal
                                        isOpen={isOpen}
                                        onOpenChange={onOpenChange}
                                        placement="top-center"
                                    >
                                        <ModalContent>
                                            {(onClose) => (
                                                <Card>
                                                    <CardBody>
                                                        <span>User created!</span>
                                                    </CardBody>
                                                </Card>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </div>
  )
}
