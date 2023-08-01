import Button from 'react-bootstrap/Button';
import  Modal  from 'react-bootstrap/Modal';

const ModalDel = (props) => {
  return (
    <Modal
      show={props.showModal}
      onHide={props.handleClose}
      style={{ color: 'black' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This operation will completely remove post from the app. <br></br>
        Are you sure you want to do that?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDel;