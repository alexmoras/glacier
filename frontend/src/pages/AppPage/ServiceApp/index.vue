<template>
    <div>
        <ShowUser v-bind:userParam="selectedUser" v-if="search === false" />
        <b-container fluid="lg" v-show="search">
            <b-form>
                <b-form-input
                        id="search-forename"
                        v-model="forename"
                ></b-form-input>

                <b-form-input
                        id="search-surname"
                        v-model="surname"
                ></b-form-input>

                <b-form-input
                        id="search-dob"
                        v-model="dob"
                ></b-form-input>

                <b-form-input
                        id="search-phone"
                        v-model="phone"
                ></b-form-input>

                <b-form-input
                        id="search-id"
                        v-model="id"
                ></b-form-input>
                <b-button variant="outline-primary" @click="onSubmit" squared>Search</b-button>
            </b-form>
            <b-card>
                <b-card v-for="(user, counter) in users" v-bind:key="counter">
                    <b-card-body>
                        <b-card-text>
                            {{ user.forename }}
                        </b-card-text>
                        <b-card-text>
                            {{ user.surname }}
                        </b-card-text>
                        <b-card-text>
                            {{ user.dob }}
                        </b-card-text>
                        <b-card-text>
                            <b-button variant="primary" squared @click="showUser(user.user)">Load User</b-button>
                        </b-card-text>
                    </b-card-body>
                </b-card>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../../../config';
    import JWTManager from "../../../components/JWTManager";
    import ShowUser from "../../../components/ShowUser";

    export default {
        name: "ServiceApp",
        components: {ShowUser},
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
            }
        }
    }
</script>

<style scoped>

</style>