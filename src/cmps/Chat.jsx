import { useState } from "react"
import { useSelector } from "react-redux"


export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [input, setInput] = useState('')

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const from = user ? user.fullname : 'user'

    const sendMsg = () => {
        if (!input.trim()) return
        const newMsg = { from, text: `${from}: ${input}` }
        setMsgs((prev) => [...prev, newMsg])
        setInput('')

        setTimeout(() => {
            setMsgs((prev) => [...prev, { from: 'support', text: 'support: Sure thing honey' }])
        }, 500)
    }

    const handleKey = (ev) => {
        if (ev.key === 'Enter') sendMsg()
    }

    return (
        <div className="chat">
            <div className="msgs">
                {msgs.map((msg, idx) => (
                    <div key={idx} className={msg.from}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
            />
            <button onClick={sendMsg}>Send 📩</button>
        </div>
    )
}