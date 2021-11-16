import React from 'react';
import { PHOTO_API_URL } from '../api/config';
import { connect } from 'react-redux';
import { deletePhoto } from '../actions/photos';
import { useDispatch } from 'react-redux';

import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

const Photo = ({ id }) => {
const url = `${PHOTO_API_URL}/${id}`;
const dispatch = useDispatch();



    return (
        <>
        <Image src={url} className="photo" fluid />
        <Button variant="dark" className="delete-button" onClick={() => dispatch(deletePhoto(id))}>X</Button>
        </>
    );
};

const mapStateToProps = (state) => ({
    photos: state.photos || [],
    errors: state.errors || {}
});

export default connect(mapStateToProps)(Photo);