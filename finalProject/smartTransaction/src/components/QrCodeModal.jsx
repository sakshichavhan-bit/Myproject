import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const QRCodeModal = (props) => {
    const { url, ...restProps } = props
    return (
        <Modal
            {...restProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Payment Qr Code
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src={url} fluid />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

        </Modal>
    );
}

export default QRCodeModal