import { api } from "../../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useUser } from "../../providers/UserProvider";
import { ContainerButtons, Form, ModalDiv } from "./style";
import { UseCurrentGroup } from "../../providers/currentGroup/currentGroup";
import { useState } from "react";
import { useEffect } from "react";

export const ModalEditGroup = ({ showModal, setShowModal }) => {

    const { token } = useUser()
    const { currentGroup } = UseCurrentGroup()

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        description: yup.string().required("Campo obrigatório"),
        category: yup.string().required("Campo obrigatório"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        api.patch(`/groups/${currentGroup.id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            toast.success("Grupo Editado!");
            return res
        }).catch(err => toast.error("Você não tem permição para editar esse grupo!"));
        setShowModal(false);
    }

    return (
        <ModalDiv showModal={showModal}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Criar Grupo</h2>
                <label htmlFor="name">Nome: <span>{errors.name?.message}</span></label>
                <input type="text" defaultValue={currentGroup.name} {...register("name")} />

                <label htmlFor="description">Descrição: <span>{errors.description?.message}</span></label>
                <input type="text" defaultValue={currentGroup.description} {...register("description")} />

                <label htmlFor="category">Categoria: <span>{errors.category?.message}</span></label>
                <select name="category" {...register("category")}>
                    <option value={currentGroup.category}>Categora Atual - {currentGroup.category}</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Música">Música</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Estudos">Estudos</option>
                    <option value="Religão">Religão</option>
                    <option value="Esporte">Esporte</option>
                </select>
                <ContainerButtons>
                    <button type="button" onClick={() => setShowModal(false)}> Cancelar</button>
                    <button className="update" type="submit">Editar</button>
                </ContainerButtons>
            </Form>
        </ModalDiv>
    )
}