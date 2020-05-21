<template>
    <b-container fluid="" id="user-container">
        <b-card class="details-container">
            <b-card-body>
                <b-card-text class="text-name">{{forename}} {{surname}}</b-card-text>
                <b-card-text class="text-dob">{{dob}}</b-card-text>
            </b-card-body>
        </b-card>
        <b-card class="contacts-container" no-body>
            <b-list-group flush>
                <div v-for="(contact, contactCounter) in contacts" v-bind:key="'Contact: ' + contactCounter">
                    <b-list-group-item>
                        <b-card-text class="text-contact-name">{{contact.forename}} {{contact.surname}}</b-card-text>
                        <b-card-text class="text-contact-relationship">{{contact.relationship}}</b-card-text>

                        <b-card-text>
                        <span v-b-toggle="'contact-phone-collapse-' + contactCounter">
                            <span class="toggled-closed">Phone <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></span><span class="toggled-open">Phone <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></span>
                        </span>
                        </b-card-text>
                        <b-collapse :id="'contact-phone-collapse-' + contactCounter">
                            <div class="container-contact-phone" v-for="(contactPhone, contactPhoneCounter) in contact.phone" v-bind:key="'ContactPhone: ' + contactPhoneCounter">
                                <b-card-text>{{contact.phone[contactPhoneCounter]}}</b-card-text>
                            </div>
                        </b-collapse>

                        <b-card-text>
                        <span v-b-toggle="'contact-address-collapse-' + contactCounter">
                            <span class="toggled-closed">Address <font-awesome-icon :icon='["far", "chevron-down"]'></font-awesome-icon></span><span class="toggled-open">Address <font-awesome-icon :icon='["far", "chevron-right"]'></font-awesome-icon></span>
                        </span>
                        </b-card-text>
                        <b-collapse :id="'contact-address-collapse-' + contactCounter">
                            <div class="container-contact-phone" v-for="(contactAddress, contactAddressCounter) in contact.address" v-bind:key="'ContactAddress: ' + contactAddressCounter">
                                <b-card-text>{{contactAddress.line1}}</b-card-text>
                                <b-card-text>{{contactAddress.line2}}</b-card-text>
                                <b-card-text>{{contactAddress.town}}</b-card-text>
                                <b-card-text>{{contactAddress.county}}</b-card-text>
                                <b-card-text>{{contactAddress.country}}</b-card-text>
                                <b-card-text>{{contactAddress.postcode}}</b-card-text>
                            </div>
                        </b-collapse>
                    </b-list-group-item>
                </div>
            </b-list-group>
        </b-card>
    </b-container>
</template>

<script>
    import axios from "axios";
    import JWTManager from "./JWTManager";

    export default {
        name: "ShowUser",
        components: {},
        props: ["userParam", "user"],
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
                    url: '/users/' + this.userParam,
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
</style>