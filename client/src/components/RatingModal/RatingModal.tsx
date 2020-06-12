import React, { Component, SyntheticEvent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class RateModal extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      setShow: false,
      timely_maintenance: 1,
      appropriate_distance: 1,
      respectful: 1,
      communication: 1,
      flexibility: 1,
      transparency: 1,
      organized: 1,
      professionalism: 1,
      comment: '',
      property_id: props.id, //need to know what the prop name is
    };
  }
  // const [show, setShow] = useState(false);

  handleClose = () => {
    this.setState({ setShow: false });
    console.log('this is state:', this.state);
  };
  handleShow = () => {
    this.setState({ setShow: true });
    console.log('this is state:', this.state);
  };
  handleFormChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.name === 'comment' ? e.target.value : parseInt(e.target.value),
    });
  };

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    //debugger;
    fetch('/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
        Accept: 'Application/JSON',
      },
      body: JSON.stringify(this.state),
    })
      .then(() => {
        //if successful redirect to the home page
        this.setState(this.state);
      })
      .catch((error) => {
        console.log(`Rating did not go through: ${error}`);
      });

    this.handleClose();
  };

  render() {
    const listRatingData = [
      { id: 1, label: 'Timely Maintenance', name: 'timely_maintenance' },
      { id: 2, label: 'Appropriate Distance', name: 'appropriate_distance' },
      { id: 3, label: 'Respectful', name: 'respectful' },
      { id: 4, label: 'Communication', name: 'communication' },
      { id: 5, label: 'Flexibility', name: 'flexibility' },
      { id: 6, label: 'Transparency', name: 'transparency' },
      { id: 7, label: 'Organized', name: 'organized' },
      { id: 8, label: 'Professionalism', name: 'professionalism' },
    ];
    return (
      <div className="Rating">
        <Button variant="primary" onClick={this.handleShow}>
          Leave a Rating
        </Button>
        <Modal show={this.state.setShow} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Rate your Landlord : 1(Worst) - 5(Best)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="basicReview">
                {listRatingData.map((data) => (
                  <div key={data.id} className="rating-form" ref={data.id}>
                    <Form.Label>{data.label}:</Form.Label>
                    {/* <Form.Control onChange={this.handleFormChange}> */}
                    <Form.Check
                      inline
                      label="1"
                      value={1}
                      type="radio"
                      name={data.name}
                      onChange={this.handleFormChange}
                    />
                    <Form.Check
                      inline
                      label="2"
                      value={2}
                      type="radio"
                      name={data.name}
                      onChange={this.handleFormChange}
                    />
                    <Form.Check
                      inline
                      label="3"
                      value={3}
                      type="radio"
                      name={data.name}
                      onChange={this.handleFormChange}
                    />
                    <Form.Check
                      inline
                      label="4"
                      value={4}
                      type="radio"
                      name={data.name}
                      onChange={this.handleFormChange}
                    />
                    <Form.Check
                      inline
                      label="5"
                      value={5}
                      type="radio"
                      name={data.name}
                      onChange={this.handleFormChange}
                    />
                    {/* </Form.Control> */}
                  </div>
                ))}
                <Form.Label>Add a comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  onChange={this.handleFormChange}
                ></Form.Control>
              </Form.Group>
              <div id="button-wrapper">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RateModal;
