import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreateableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from "./App"

type NoteFormProps = {
    onSubmit:  (data:NoteData) => void
}

const NoteForm = ({onSubmit}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

     function handlesubmit(e: FormEvent){
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown:  markDownRef.current!.value,
            tags: []
        })
     }

  return (
    <Form onSubmit={handlesubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required ref={titleRef}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <CreateableReactSelect isMulti value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })} onChange={tags => {
                            
                        }}/>
                    </Form.Group>
                    
                </Col>
            </Row>
        <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as='textarea' rows={15} ref={markDownRef}/>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                        <Button type="submit" variant="outline-primary">Save</Button>
                        <Link to = '..'>
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                        </Link>
                    </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm
