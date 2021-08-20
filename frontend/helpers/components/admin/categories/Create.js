import React, { useState } from 'react'
import axios from '../../../../axios/CategoryAxios';
import {motion} from 'framer-motion';
import Swal from 'sweetalert2';

const Create = ({ SetCategories, SetForm }) => {

    const [name, SetName] = useState('');
    const [slug, SetSlug] = useState('');

    const [nameError, SetNameError] = useState(false);
    const [slugError, SetSlugError] = useState(false);

    function handleCancel(e, SetError) {
        const alert = e.target.parentElement;
        alert.style.opacity = 0;
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            SetError(false);
        }, 500)
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.createCategory({name, slug}, SetCategories, SetNameError, SetSlugError)
            .then(resp => {
                if(resp){
                    Swal.fire(
                        'Categoría Creada', 
                        'La categoría ha sido creada correctamente',
                        'success'
                    ).then(()=>{
                        const body = document.querySelector('body');
                        if(body){
                            body.style.overflowY = 'auto';
                        }
                        SetForm(false);

                    })
                }
            });

    }
    return (
        <div className="mt container">
            <div className="container">

                <form onSubmit={handleSubmit} className="form">

                    {
                        nameError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{nameError} <span className="x" onClick={e => handleCancel(e, SetNameError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="name">Nombre</label>
                        <input value={name} type="text" id="name" placeholder="Nombre" onChange={e => SetName(e.target.value)} />
                    </div>

                    {
                        slugError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{slugError} <span className="x" onClick={e => handleCancel(e, SetSlugError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="slug">URL</label>
                        <input value={slug} type="text" id="slug" placeholder="URL" onChange={e => SetSlug(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-success mt">Crear Categoría</button>
                </form>

            </div>
        </div>
    )
}

export default Create
