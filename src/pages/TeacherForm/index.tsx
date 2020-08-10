import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../service/api';

function TeacherForm() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
   

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ]);

    
    function addNewScheduleItem () {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: ''}
        ]);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=> {
            alert("Cadastro realizado com sucesso");
            history.push('/');
        }).catch(()=> {
            alert("Erro no cadastro");
        })

    }

    function setScheduleItemVaule(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=> {
            if(index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title='Que incrível que você quer dar aulas.'
            description='O primeiro passo é preencher esse formulário'
            />

        <main>
            <fieldset>
                <legend>Seus Dados</legend>

                <Input 
                    label='Nome Completo' 
                    name='name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input 
                    label='Avatar' 
                    name='avatar'
                    value={avatar}
                    onChange={(e) => { setAvatar(e.target.value) }}
                />
                <Input 
                    label='WhatsApp' 
                    name='whatsapp'
                    value={whatsapp}
                    onChange={(e) => { setWhatsapp(e.target.value) }}
                />
                <Textarea
                    name="bio" 
                    label="Biografia"
                    value={bio}
                    onChange={(e) => { setBio(e.target.value) }} 
                />

            </fieldset>

            <fieldset>
                <legend>Sobre a aula</legend>

                <Select 
                    label='Matéria' 
                    name='subject'
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
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
                <Input 
                    label='Custo da sua hora por aula' 
                    name='cost'
                    value={cost}
                    onChange={(e) => { setCost(e.target.value) }}
                />
            </fieldset>
            <fieldset>
                <legend>
                    Horários disponíveis
                    <button type='button' onClick={addNewScheduleItem}>
                        + Novo horário
                    </button>
                </legend>

                {scheduleItems.map((scheduleItem, index) => {
                    return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                    <Select 
                        label='Dia da semana' 
                        name='week_day'
                        value={scheduleItem.week_day}
                        onChange={(e) => {setScheduleItemVaule(index, 'week_day', e.target.value)}}
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
                        name='from' 
                        label='Das' 
                        type='time'
                        value={scheduleItem.from}
                        onChange={e => setScheduleItemVaule(index, 'from', e.target.value)}
                    />
                    <Input 
                        name='to' 
                        label='Até' 
                        type='time'
                        value={scheduleItem.to}
                        onChange={e => setScheduleItemVaule(index, 'to', e.target.value)}
                    />
              </div>
                    )
                })}
            </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt='Aviso importante'/>
                    Importante! <br/>
                    Preencha todos os dados
                </p>
                <button type='submit' onClick={handleCreateClass} >
                    Salvar cadastro
                </button>
            </footer>
        </main>
        </div>

        
    )
}

export default TeacherForm;