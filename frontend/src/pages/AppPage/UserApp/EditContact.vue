<template>
    <b-container class="contacts-container" v-show="loaded">
        <b-card>
            <b-button variant="success" class="float-right" @click="addContact"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
            <b-card-title>Edit Contacts</b-card-title>
            <b-form>
                <b-card class="outer-card" id="contacts" v-for="(add, counter) in contacts" v-bind:key="counter" no-body>
                    <b-card-body>
                        <b-list-group flush>
                            <b-list-group-item>
                                <b-card-text>
                                    <b-form-input
                                            id="forename"
                                            placeholder="First Name"
                                            v-model="add.forename"
                                            required
                                    ></b-form-input>
                                </b-card-text>

                                <b-card-text>
                                    <b-form-input
                                            id="surname"
                                            placeholder="Last Name"
                                            v-model="add.surname"
                                            required
                                    ></b-form-input>
                                </b-card-text>

                                <b-card-text>
                                    <b-form-input
                                            id="relationship"
                                            placeholder="Relationship"
                                            v-model="add.relationship"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                            </b-list-group-item>
                            <b-list-group-item>
                                <b-button variant="success" class="float-right" @click="addContactPhone(counter)"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
                                <b-card-title>Phone</b-card-title>
                                <b-card class="inner-card" id="phone" v-for="(addPhone, counterPhone) in add.phone" v-bind:key="'P' + counterPhone" no-body>
                                    <b-card-body>
                                        <b-card-text>
                                            <b-form-input
                                                    id="relationship"
                                                    placeholder="Phone"
                                                    v-model="add.phone[counterPhone]"
                                                    required
                                            ></b-form-input>
                                        </b-card-text>
                                    </b-card-body>
                                    <b-button size="sm" variant="outline-danger" class="float-right" @click="deleteContactPhone(counter, counterPhone)"><font-awesome-icon size="lg" :icon="['fal', 'times']"></font-awesome-icon></b-button>
                                </b-card>
                            </b-list-group-item>
                            <b-list-group-item>
                                <b-button variant="success" class="float-right" @click="addContactAddress(counter)"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
                                <b-card-title>Address</b-card-title>
                                <b-card class="inner-card" id="address" v-for="(addAddress, counterAddress) in add.address" v-bind:key="'A' + counterAddress" no-body>
                                    <b-card-body>
                                        <b-card-text>
                                            <b-form-input
                                                    id="line1"
                                                    placeholder="Line 1"
                                                    v-model="addAddress.line1"
                                                    required
                                            ></b-form-input>
                                        </b-card-text>

                                        <b-card-text>
                                            <b-form-input
                                                    id="line2"
                                                    placeholder="Line 2"
                                                    v-model="addAddress.line2"
                                            ></b-form-input>
                                        </b-card-text>

                                        <b-card-text>
                                            <b-form-input
                                                    id="town"
                                                    placeholder="Town"
                                                    v-model="addAddress.town"
                                            ></b-form-input>
                                        </b-card-text>

                                        <b-card-text>
                                            <b-form-input
                                                    id="county"
                                                    placeholder="County"
                                                    v-model="addAddress.county"
                                            ></b-form-input>
                                        </b-card-text>

                                        <b-card-text>
                                            <b-form-input
                                                    id="country"
                                                    placeholder="Country"
                                                    v-model="addAddress.country"
                                                    required
                                            ></b-form-input>
                                        </b-card-text>

                                        <b-card-text>
                                            <b-form-input
                                                    id="postcode"
                                                    placeholder="Post Code"
                                                    v-model="addAddress.postcode"
                                                    required
                                            ></b-form-input>
                                        </b-card-text>
                                    </b-card-body>
                                    <b-button size="sm" variant="outline-danger" class="float-right" @click="deleteContactAddress(counter, counterAddress)"><font-awesome-icon size="lg" :icon="['fal', 'times']"></font-awesome-icon></b-button>
                                </b-card>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-body>
                    <b-button size="sm" variant="outline-danger" class="float-right" @click="deleteContact(counter)">Delete Contact</b-button>
                </b-card>
            </b-form>
            <b-button id="button-submit" variant="primary" @click="onSubmit" :disabled="!loaded">Submit</b-button>
        </b-card>
    </b-container>
</template>

<script>
    import axios from "axios";
    import JWTManager from "../../../components/JWTManager";
    import config from "../../../../config";

    export default {
        name: "EditContact",
        props: ["user"],
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
            getSelf() {
                axios({
                    method: 'get',
                    url: config.apiUrl + '/users/me',
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if (msg.data.success === true) {
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
                            this.loaded = true;
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
                    url: config.apiUrl + '/users/me/ice',
                    data: JSON.stringify(json),
                    headers: {
                        'Authorization': 'Bearer ' + JWTManager.methods.getJWT(),
                        'Content-Type': 'application/json'
                    }
                })
                    .then(msg => {
                        if(msg.data.success === true){
                            this.$emit('success', true);
                        } else {
                            this.$emit('success', false);
                        }
                    })
                    .catch(err => {
                        alert(err + '\n' + JSON.stringify(json));
                        this.$emit('success', false);
                    });
            }
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
    .outer-card{
        margin-top: 1.0rem;
        margin-bottom: 2.0rem;
    }
    .inner-card{
        margin-top: 1.0rem;
        margin-bottom: 1.0rem;
    }
    #button-submit{
        width: 100%;
    }
</style>