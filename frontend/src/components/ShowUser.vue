<template>
    <b-container fluid="" id="user-container">
        <b-card id="details-container" no-body>
            <b-list-group flush>
                <b-container fluid="">
                    <b-button class="float-right" variant="secondary" v-if="edit === true" @click="editUser" squared>Edit <font-awesome-icon :icon="['far', 'edit']"></font-awesome-icon></b-button>
                </b-container>
                <b-list-group-item>
                    <b-card-body class="text-center">
                        <b-card-text class="text-name"><h2>{{forename}} {{surname}}</h2></b-card-text>
                        <b-card-text class="text-dob"><h3>{{dob}}</h3></b-card-text>
                    </b-card-body>
                </b-list-group-item>
                <b-list-group-item>
                    <b-card-title>
                        Medical Notes:
                    </b-card-title>
                    <b-card-body>
                        <b-card-text v-text="medical"></b-card-text>
                    </b-card-body>
                </b-list-group-item>
            </b-list-group>
            <b-card-group deck id="container-user-deck">
                <b-card>
                    <span v-b-toggle="'user-id'">
                        <b-card-title class="toggled-closed">ID Number <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></b-card-title>
                        <b-card-title class="toggled-open">ID Number <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></b-card-title>
                    </span>
                    <b-collapse id="user-id">
                        <b-card-body v-for="(idNumber, idCounter) in idNumber" v-bind:key="'ID' + idCounter">
                            <b-card-text>{{idNumber.name}}: {{idNumber.value}}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card>
                    <span v-b-toggle="'user-address'">
                        <b-card-title class="toggled-closed">Address <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></b-card-title>
                        <b-card-title class="toggled-open">Address <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></b-card-title>
                    </span>
                    <b-collapse id="user-address">
                        <b-card-body v-for="(add, addCounter) in address" v-bind:key="'Address' + addCounter">
                            <b-card-text>
                                {{add.line1}}, {{add.line2}} {{add.town}}, {{add.county}}, {{add.country}}, {{add.postcode}}
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card>
                    <span v-b-toggle="'user-phone'">
                        <b-card-title class="toggled-closed">Phone <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></b-card-title>
                        <b-card-title class="toggled-open">Phone <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></b-card-title>
                    </span>
                    <b-collapse id="user-phone">
                        <b-card-body v-for="(singlePhone, phoneCounter) in phone" v-bind:key="'Phone' + phoneCounter">
                            <b-card-text>
                                {{phone[phoneCounter]}}
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </b-card-group>
        </b-card>
        <b-card id="contacts-container">
            <b-button class="float-right" variant="secondary" v-if="edit === true" @click="editContacts" squared>Edit <font-awesome-icon :icon="['far', 'edit']"></font-awesome-icon></b-button>
            <b-card-title>Contacts</b-card-title>
            <b-card-group deck>
                <b-card v-for="(contact, contactCounter) in contacts" v-bind:key="'Contact: ' + contactCounter">
                    <b-card-title>
                        <b-card-text class="text-contact-name">{{contact.forename}} {{contact.surname}}</b-card-text>
                    </b-card-title>
                    <b-card-sub-title>
                        <b-card-text class="text-contact-relationship">{{contact.relationship}}</b-card-text>
                    </b-card-sub-title>

                    <b-card-body>
                        <b-card-text class="toggle-text">
                        <span v-b-toggle="'contact-phone-collapse-' + contactCounter">
                            <span class="toggled-closed">Phone <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></span><span class="toggled-open">Phone <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></span>
                        </span>
                        </b-card-text>
                        <b-collapse :id="'contact-phone-collapse-' + contactCounter">
                            <div class="container-contact-phone" v-for="(contactPhone, contactPhoneCounter) in contact.phone" v-bind:key="'ContactPhone: ' + contactPhoneCounter">
                                <b-card-text class="drop-text">{{contact.phone[contactPhoneCounter]}}</b-card-text>
                            </div>
                        </b-collapse>

                        <b-card-text class="toggle-text">
                        <span v-b-toggle="'contact-address-collapse-' + contactCounter">
                            <span class="toggled-closed">Address <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></span><span class="toggled-open">Address <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></span>
                        </span>
                        </b-card-text>
                        <b-collapse :id="'contact-address-collapse-' + contactCounter">
                            <div class="container-contact-address" v-for="(contactAddress, contactAddressCounter) in contact.address" v-bind:key="'ContactAddress: ' + contactAddressCounter">
                                <b-card-text class="drop-text">{{contactAddress.line1}}, {{contactAddress.line2}} {{contactAddress.town}}, {{contactAddress.county}}, {{contactAddress.country}}, {{contactAddress.postcode}}</b-card-text>
                            </div>
                        </b-collapse>
                    </b-card-body>
                </b-card>
            </b-card-group>
        </b-card>
    </b-container>
</template>

<script>
    import axios from "axios";
    import JWTManager from "./JWTManager";
    import config from "../../config";

    export default {
        name: "ShowUser",
        components: {},
        props: ["userParam", "user", "edit"],
        data() {
            return {
                loaded: false,
                forename: '',
                surname: '',
                dob: '',
                medical: '',
                idNumber: [],
                phone: [],
                address: [],
                contacts: []
            }
        },
        methods: {
            getUser(){
                axios({
                    method: 'get',
                    url: config.apiUrl + '/users/' + this.userParam,
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if(msg.data.success === true){
                            this.forename = msg.data.message.ice.forename;
                            this.surname = msg.data.message.ice.surname;
                            this.dob = msg.data.message.ice.dob;
                            this.medical = msg.data.message.ice.medical;
                            if(Array.isArray(msg.data.message.ice.address)){
                                this.address = msg.data.message.ice.address;
                            }

                            if(Array.isArray(msg.data.message.ice.phone)){
                                this.phone = msg.data.message.ice.phone;
                            }

                            if(Array.isArray(msg.data.message.ice.idNumber)){
                                this.idNumber = msg.data.message.ice.idNumber;
                            }

                            if(Array.isArray(msg.data.message.ice.contacts)){
                                this.contacts = msg.data.message.ice.contacts;
                            }
                            this.loaded = true;
                        }
                        return msg;
                    })
                    .catch(err => {
                        return err;
                    })
            },
            editContacts(){
                this.$emit('editContacts', true);
            },
            editUser(){
                this.$emit('editUser', true);
            }
        },
        computed: {
        },
        created() {
            if(this.user != null){
                this.forename = this.user.ice.forename;
                this.surname = this.user.ice.surname;
                this.dob = this.user.ice.dob;
                this.medical = this.user.ice.medical;
                if(Array.isArray(this.user.ice.address)){
                    this.address = this.user.ice.address;
                }

                if(Array.isArray(this.user.ice.phone)){
                    this.phone = this.user.ice.phone;
                }

                if(Array.isArray(this.user.ice.idNumber)){
                    this.idNumber = this.user.ice.idNumber;
                }

                if(Array.isArray(this.user.ice.contacts)){
                    this.contacts = this.user.ice.contacts;
                }
                this.loaded = true;
            } else {
                this.getUser();
            }
        }
    }
</script>

<style scoped>
    .collapsed > .toggled-closed,
    .not-collapsed > .toggled-open {
        display: none;
    }
    #user-container{
        margin-top: 2.0rem;
        margin-bottom: 4.0rem;
    }
    #container-user-deck{
        padding: 1.0rem;
        padding-top: 2.0rem;
    }
    #details-container{
        padding: 1.0rem;
    }
    #contacts-container{
        margin-top: 4.0rem;
        margin-bottom: 2.0rem;
        padding-left: 1.0rem;
        padding-right: 1.0rem;
        padding-bottom: 1.0rem;
    }
    .container-contact-phone{
        padding-bottom: 1.0rem;
    }
    .container-contact-address{
        padding-bottom: 1.0rem;
    }
    .toggle-text{
        font-weight: 600;
    }
    .drop-text{
        font-weight: 400;
    }
</style>