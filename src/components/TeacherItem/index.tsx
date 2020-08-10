import React from 'react';


import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css';
import api from '../../service/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacherInfo: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacherInfo }) => {

    function createNewConnection(){
        api.post('connections', {
            "user_id": teacherInfo.id
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacherInfo.avatar} alt="Daniel Bonasser" />
                <div>
                    <strong>{teacherInfo.name}</strong>
                    <span>{teacherInfo.subject}</span>
                </div>
            </header>

            <p> {teacherInfo.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>{teacherInfo.cost}</strong>
                </p>
                <a
                    target='blank'
                     onClick={createNewConnection} 
                     href={`https://wa.me/${teacherInfo.whatsapp}`}>
                    <img src={whatsappIcon} alt="whatsapp icone" />
                            Entrar em contato
                    </a>
            </footer>
        </article>
    )
}

export default TeacherItem;