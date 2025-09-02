import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"


export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [input, setInput] = useState('')
    const msgsRef = useRef()
    const { t } = useTranslation()

    useEffect(() => {
        if (msgsRef.current) {
            msgsRef.current.scrollTo({
                top: msgsRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [msgs])

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const from = user ? user.fullname : 'user'

    const sendMsg = (ev) => {
        ev.preventDefault()
        if (!input.trim()) return
        const newMsg = { from, text: `${input}`, timestamp: new Date().toLocaleTimeString() }
        setMsgs((prev) => [...prev, newMsg])
        setInput('')

        setTimeout(() => {
            setMsgs((prev) => [...prev, { from: 'support', text: 'Sure thing honey', timestamp: new Date().toLocaleTimeString() }])
        }, 500)
    }

    const handleKey = (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault()
            sendMsg(ev)
        }
    }

    return (
        <div className="chat-container">
            <div ref={msgsRef} className="chat-messages">
                {msgs.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.from === from ? 'user' : 'other'}`}>
                        <section>
                            <span className="timestamp">{msg.timestamp}</span>
                            <h3>{msg.from === 'user' ? t('chat.you') : msg.from}: </h3>
                        </section>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMsg} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(ev) => setInput(ev.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t('chat.placeholder')}
                />
                <button type="submit">{t('chat.send')}</button>
            </form>
        </div>
    )
}