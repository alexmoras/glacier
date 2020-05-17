<template>
    <div>
        <div class="contacts-container">
            <b-form>
                <b-button class="addButton" @click="addContact">Add Contact</b-button>
                <div id="contacts" v-for="(add, counter) in contacts" v-bind:key="counter">
                    <b-form-input
                            id="forename"
                            placeholder="First Name"
                            v-model="add.forename"
                            required
                    ></b-form-input>

                    <b-form-input
                            id="surname"
                            placeholder="Last Name"
                            v-model="add.surname"
                            required
                    ></b-form-input>

                    <b-form-input
                            id="relationship"
                            placeholder="Relationship"
                            v-model="add.relationship"
                            required
                    ></b-form-input>

                    <b-button class="addButton" @click="addContactPhone(counter)">Add Phone</b-button>
                    <div id="phone" v-for="(addPhone, counterPhone) in add.phone" v-bind:key="'P' + counterPhone">
                        <b-form-input
                                id="relationship"
                                placeholder="Phone"
                                v-model="add.phone[counterPhone]"
                                required
                        ></b-form-input>
                        <b-button class="deleteButton" @click="deleteContactPhone(counter, counterPhone)">Delete Phone</b-button>
                    </div>

                    <b-button class="addButton" @click="addContactAddress(counter)">Add Address</b-button>
                    <div id="address" v-for="(addAddress, counterAddress) in add.address" v-bind:key="'A' + counterAddress">
                        <b-form-input
                                id="line1"
                                placeholder="Line 1"
                                v-model="addAddress.line1"
                                required
                        ></b-form-input>

                        <b-form-input
                                id="line2"
                                placeholder="Line 2"
                                v-model="addAddress.line2"
                        ></b-form-input>

                        <b-form-input
                                id="town"
                                placeholder="Town"
                                v-model="addAddress.town"
                        ></b-form-input>

                        <b-form-input
                                id="county"
                                placeholder="County"
                                v-model="addAddress.county"
                        ></b-form-input>

                        <b-form-input
                                id="country"
                                placeholder="Country"
                                v-model="addAddress.country"
                                required
                        ></b-form-input>

                        <b-form-input
                                id="postcode"
                                placeholder="Post Code"
                                v-model="addAddress.postcode"
                                required
                        ></b-form-input>
                        <b-button class="deleteButton" @click="deleteContactAddress(counter, counterAddress)">Delete Address</b-button>
                    </div>
                    <b-button class="deleteButton" @click="deleteContact(counter)">Delete Contact</b-button>
                </div>
                <b-button @click="onSubmit">Submit</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import JWTManager from "../../../../components/JWTManager";

    export default {
        name: "EditContact",
        data() {
            return {
                user: {},
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
            getSelf() {
                axios({
                    method: 'get',
                    url: '/users/me',
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if (msg.data.success === true) {
                            this.user = msg.data.message;
                            this.forename = msg.data.message.ice.forename;
                            this.surname = msg.data.message.ice.surname;
                            this.dob = msg.data.message.ice.dob;
                            this.medical = msg.data.message.ice.medical;
                            if (Array.isArray(msg.data.message.ice.address)) {
                                this.address = msg.data.message.ice.address;
                            }

                            if (Array.isArray(msg.data.message.ice.phone)) {
                                this.phone = msg.data.message.ice.phone;
                            }

                            if (Array.isArray(msg.data.message.ice.idNumber)) {
                                this.idNumber = msg.data.message.ice.idNumber;
                            }

                            if (Array.isArray(msg.data.message.ice.contacts)) {
                                this.contacts = msg.data.message.ice.contacts;
                            }
                        }
                        return msg;
                    })
                    .catch(err => {
                        return err;
                    })
            },
            addContact(){
                this.contacts.push({
                    forename: '',
                    surname: '',
                    relationship: '',
                    phone: [],
                    address: []
                });
            },
            deleteContact(contact){
                this.contacts.splice(contact, 1);
            },
            addContactPhone(contact){
                this.contacts[contact].phone.push('');
            },
            deleteContactPhone(contact, phone){
                this.contacts[contact].phone.splice(phone, 1);
            },
            addContactAddress(contact){
                this.contacts[contact].address.push({
                    line1: '',
                    line2: '',
                    town: '',
                    county: '',
                    country: '',
                    postcode: ''
                });
            },
            deleteContactAddress(contact, address){
                this.contacts[contact].address.splice(address, 1);
            },
            onSubmit(){
                let json = {
                    forename: this.forename,
                    surname: this.surname,
                    dob: this.dob,
                    medical: this.medical,
                    address: this.address,
                    phone: this.phone,
                    idNumber: this.idNumber,
                    contacts: this.contacts
                };
                axios({
                    method: 'put',
                    url: '/users/me/ice',
                    data: JSON.stringify(json),
                    headers: {
                        'Authorization': 'Bearer ' + JWTManager.methods.getJWT(),
                        'Content-Type': 'application/json'
                    }
                })
                    .then(msg => {
                        if(msg.data.success === true){
                            alert("Success");
                        } else {
                            alert(msg.data.message);
                        }
                    })
                    .catch(err => {
                        alert(err + '\n' + JSON.stringify(json));
                    });
            }
        },
        created() {
            this.getSelf();
        }
    }
</script>

<style scoped>

</style>