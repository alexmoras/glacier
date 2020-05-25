<template>
    <b-container fluid="lg">
        <ShowUser v-bind:userParam="selectedUser" v-bind:closeButton="true" v-if="search === false" v-on:close="hideUser" />
        <div v-show="search">
            <b-card class="service-container">
                <span v-b-toggle="'search-dropdown'">
                    <b-card-title class="toggled-closed">Search <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></b-card-title>
                    <b-card-title class="toggled-open">Search <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></b-card-title>
                </span>
                <b-collapse id="search-dropdown" visible>
                    <b-form>
                        <b-card-body>
                            <b-card-text>
                                <b-form-input
                                        id="search-forename"
                                        v-model="forename"
                                        placeholder="First Name"
                                ></b-form-input>
                            </b-card-text>

                            <b-card-text>
                                <b-form-input
                                        id="search-surname"
                                        v-model="surname"
                                        placeholder="Last Name"
                                ></b-form-input>
                            </b-card-text>

                            <b-card-text>
                                <b-form-datepicker
                                        id="dob"
                                        v-model="dob"
                                        :date-format-options="{day: numerical, month: numerical, year: numerical}"
                                        show-decade-nav
                                        required
                                ></b-form-datepicker>
                            </b-card-text>

                            <b-card-text>
                                <b-form-input
                                        id="search-phone"
                                        v-model="phone"
                                        placeholder="Phone"
                                ></b-form-input>
                            </b-card-text>

                            <b-card-text>
                                <b-form-input
                                        id="search-id"
                                        v-model="id"
                                        placeholder="ID Number (i.e. Driving licence number, student number)"
                                ></b-form-input>
                            </b-card-text>
                            <b-button variant="outline-primary" @click="onSubmit" squared>Search</b-button>
                        </b-card-body>
                    </b-form>
                </b-collapse>
            </b-card>
            <b-card class="service-container">
                <b-card-title>Results</b-card-title>
                <b-card class="inner-card" v-for="(user, counter) in users" v-bind:key="counter">
                    <b-card-body>
                        <b-button class="float-right" variant="primary" squared @click="showUser(user.user)">Load User</b-button>
                        <b-card-text>
                            {{ user.forename }} {{ user.surname }} - {{ user.dob }}
                        </b-card-text>
                    </b-card-body>
                </b-card>
            </b-card>
        </div>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import config from '../../../../config';
    import JWTManager from "../../../components/JWTManager";
    import ShowUser from "../../../components/ShowUser";

    export default {
        name: "ServiceApp",
        components: { ShowUser },
        data() {
            return {
                search: true,
                selectedUser: '',
                users: [],
                forename: '',
                surname: '',
                dob: '',
                phone: '',
                id: ''
            }
        },
        methods: {
            makeQuery(){
                let url = "?";
                if(this.forename != null){
                    url = url + "forename=" + this.forename + "&";
                }
                if(this.surname != null){
                    url = url + "surname=" + this.surname + "&";
                }
                if(this.dob != null){
                    url = url + "dob=" + this.dob + "&";
                }
                if(this.phone != null){
                    url = url + "phone=" + this.phone + "&";
                }
                if(this.id != null){
                    url = url + "id=" + this.id + "&";
                }
                return url;
            },
            getUsers(){
                axios({
                    method: 'get',
                    url: config.apiUrl + '/users' + this.makeQuery(),
                    headers: JWTManager.methods.getJWTHeader()
                })
                .then(msg => {
                    if(msg.data.success === true){
                        this.users = msg.data.message;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
            },
            onSubmit(){
                this.getUsers();
            },
            showUser(user){
                this.selectedUser = user;
                this.search = false;
            },
            hideUser(){
                this.search = true;
            }
        },
    }
</script>

<style scoped>
    .collapsed > .toggled-closed,
    .not-collapsed > .toggled-open {
        display: none;
    }
    .service-container{
        margin-top: 2.0rem;
        margin-bottom: 4.0rem;
    }
    .inner-card{
        margin-top: 1.0rem;
        margin-bottom: 1.0rem;
    }
</style>