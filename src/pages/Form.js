import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ReCAPTCHA from "react-google-recaptcha"

export default function LoginForm() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [count, setCount] = useState(0);
    const [alerts, setAlerts] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    function refreshPage() {
        window.location.reload(false);
      }
    
    const useTimer = (startTime) => {
        const [time, setTime] = useState(startTime)
        const [intervalID, setIntervalID] = useState(null)
        const hasTimerEnded = time <= 0
        const isTimerRunning = intervalID != null
      
        const update = () => {
            setTime(time => time - 1)
        }
        const startTimer = () => {
            if (!hasTimerEnded && !isTimerRunning) {
                setIntervalID(setInterval(update, 1000))
            }
        }
        // clear interval when the timer ends
        useEffect(() => {
            if (hasTimerEnded) {
                clearInterval(intervalID)
                setIntervalID(null)
            }
        }, [hasTimerEnded, intervalID])
        // clear interval when component unmounts
        useEffect(() => () => {
            clearInterval(intervalID)
        }, [intervalID])
        return {
            time,
            startTimer
        }
      }

    const handleClose = () => {
        setShow(false)
        refreshPage()
    };
    const handleShow = () => setShow(true);
    const { time, startTimer } = useTimer(30)
    
    useEffect(() => {
        if (count > 2) {
            setIsButtonDisabled(true);
            setTimeout(() => {
                setIsButtonDisabled(false)
                setAlerts(false)
              }, 30000);
              setCount(0)
        }
       
    }, [count]);

    const send = () => {

        if (name === 'admin' && pass === 'admin'){
            handleClose()
            setIsValid(true)
            refreshPage()
        } else {
            setIsValid(false)
            setCount(count + 1)
            if(count <=1){
                setAlerts(alerts => {
                    return <Alert variant="danger"> Oops! Try again</Alert>  
                });
            }
            if(count >= 2){
                startTimer()
                setAlerts(
                    <Alert variant="danger"> Oops! Try again in {time} s</Alert>  
                );
            }
        }
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column">
                <div>
                    <div>
                        <Button className="fw-normal" onClick={handleShow} >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alerts}
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Nama</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="nama" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput2" className="form-label">Password</label>
                        <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="form-control" id="exampleFormControlInput2" placeholder="password" />
                    </div>
                    <ReCAPTCHA sitekey='6Lf0YxMkAAAAAIWaoUVGxLYcwpumBGy8cM8pdcoN'/>
                </Modal.Body>
                <Modal.Footer>

                    <Button disabled={isButtonDisabled} variant="primary" onClick={send}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}