﻿

<template>
    <div class="panel-heading">
        <h4>Filtro Analisis Cambio De Precios.</h4>
        <div class="row">
            <div class="col-sm-3">
                <label>Pasillo</label>
                <select class="form-control" v-model="parametros.Pasillo">
                    <option v-for="item in Analisis.Pasillo">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Localizacion</label>
                <select class="form-control" v-model="parametros.Localizacion">
                    <option v-for="item in Analisis.Localizacion">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Clase</label>
                <select class="form-control" v-model="parametros.Clase">
                    <option v-for="item in Analisis.Clase">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Categoria</label>
                <select class="form-control" v-model="parametros.Categoria">
                    <option v-for="item in Analisis.Categoria">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Familia</label>
                <select class="form-control" v-model="parametros.Familia">
                    <option v-for="item in Analisis.Familia">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Canasta Basica</label>
                <select class="form-control" v-model="parametros.CanastaBasica">
                    <option v-for="item in Analisis.CanastaBasica">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Color</label>
                <select class="form-control" v-model="parametros.Color">
                    <option v-for="item in Analisis.Color">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Marca</label>
                <select class="form-control" v-model="parametros.Marca">
                    <option v-for="item in Analisis.Marca">{{item}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'FiltroAnalisis',
        props: {
            parametros: {
                Localizacion: "Todos",
                Pasillo: "Todos",
                Clase:"Todos",
                Categoria: "Todos",
                Familia: "Todos",
                CanastaBasica: "Todos",
                Color: "Todos",
                Marca: "Todos",
                Clasificacion8020: "Todos",
            },
            Analisis: {
                Localizacion: [],
                Pasillo: [],
                Clase: [],
                Categoria: [],
                Familia: [],
                CanastaBasica: [],
                Color: [],
                Marca: [],
                Clasificacion8020: [],
                Productos:[]
            }
        },
        updated() {
            console.log("Cambio...");
        }
    }
</script>