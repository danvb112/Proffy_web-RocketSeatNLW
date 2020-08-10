import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import './style.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../service/api';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const[subject, setSubject] = useState('');
    const[week_day, setWeekDay] = useState('');
    const[time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data)
        
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title='Esses são os Proffys disponíveis.'>
                <form id="search-teachers" onSubmit={searchTeachers} >
 
                <Select 
                    label='Matéria' 
                    name='subject'
                    value={subject}
                    onChange={(e)=> { setSubject(e.target.value) }}
                    options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Quimica', label: 'Quimica' },
                        { value: 'Matematica', label: 'Matematica' },
                        { value: 'Português', label: 'Português' },
                        { value: 'Geografia', label: 'Geografia' },
                        { value: 'História', label: 'História' },
                        { value: 'Educação Fisica', label: 'Educação Fisica' },
                    ]}
                />
                <Select 
                    label='Dia da semana' 
                    name='week_day'
                    value={week_day}
                    onChange={(e)=> { setWeekDay(e.target.value) }}
                    options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-Feira' },
                        { value: '2', label: 'Terça-Feira' },
                        { value: '3', label: 'Quarta-Feira' },
                        { value: '4', label: 'Quinta-Feira' },
                        { value: '5', label: 'Sexta-Feira' },
                        { value: '6', label: 'Sábado' },
                    ]}
                />
                    <Input 
                        type='time' 
                        name='time' 
                        label='Hora' 
                        value={time}
                        onChange={(e)=> { setTime(e.target.value) }}
                    />
                    <button type='submit'>
                        buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacherInfo={teacher}/>
                })}
                
            </main>
        </div>
    )
}

export default TeacherList;