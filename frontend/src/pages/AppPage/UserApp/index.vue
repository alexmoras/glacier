<template>
    <b-container fluid="lg" id="container-user">
        <b-row class="text-center edit-buttons">
            <b-col cols="6"><b-button size="lg" id="button-edit-user" variant="outline-primary" squared @click="editUser">Edit Profile</b-button></b-col>
            <b-col cols="6"><b-button size="lg" id="button-edit-contact" variant="outline-primary" squared @click="editContact">Edit Contacts</b-button></b-col>
        </b-row>
        <b-row>
            <b-col>
            <ShowUser v-if="showUserToggle === true" v-bind:userParam="'me'" v-bind:user="user" />
            <EditUser v-if="editUserToggle === true" v-on:success="editComplete($event)" v-bind:user="user" />
            <EditContact v-if="editContactToggle === true" v-on:success="editComplete($event)" v-bind:user="user" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import ShowUser from "../../../components/ShowUser";
    import EditUser from "./EditUser";
    import EditContact from "./EditContact";
    import axios from "axios";
    import JWTManager from "../../../components/JWTManager";
    import config from "../../../../config";
    export default {
        name: "UserApp",
        components: {EditContact, EditUser, ShowUser},
        data() {
            return {
                loaded: false,
                user: {},
                showUserToggle: false,
                editUserToggle: false,
                editContactToggle: false,
            }
        },
        methods: {
            async getUser(user){
                let userParam;
                if(user){
                    userParam = user;
                } else {
                    userParam = 'me';
                }
                return axios({
                    method: 'get',
                    url: config.apiUrl + '/users/' + userParam,
                    headers: JWTManager.methods.getJWTHeader()
                })
                .then(msg => {
                    if(msg.data.success === true){
                        this.user = msg.data.message;
                        this.loaded = true;
                        return msg.data.message;
                    }
                    else {
                        throw new Error(msg.data);
                    }
                })
            },
            showUser(){
                this.showUserToggle = true;
                this.editUserToggle = false;
                this.editContactToggle = false;
            },
            editUser(){
                this.showUserToggle = false;
                this.editUserToggle = true;
                this.editContactToggle = false;
            },
            editContact(){
                this.showUserToggle = false;
                this.editUserToggle = false;
                this.editContactToggle = true;
            },
            editComplete(success){
                if(success === true){
                    this.loaded = false;
                    this.getUser()
                    .then(() => {
                        this.$forceUpdate();
                        this.showUser();
                    })
                    .catch(err => {
                        alert(err);
                    })
                    // Show a success message!
                } else {
                    alert("An error occurred. Sorry!");
                }
            }
        },
        created() {
            this.loaded = false;
            this.getUser()
            .then(() => {
                this.showUser();
            })
            .catch(() => {
                this.$router.push("/login");
            })
            if(this.user.forename === null || this.user.forename === ''){
                // Get-started Wizard
            }
        }
    }
</script>

<style scoped>
    #container-user{
        padding-top: 0.5rem;
    }
    .edit-buttons{
        padding-top: 2.0rem;
    }
</style>