<template>
    <div id="profile-container" v-show="loaded">
        <b-card>
            <b-button class="float-right" v-if="closeButton === true" @click="$emit('close', true)" squared>Close</b-button>
            <b-card-title>Edit Profile</b-card-title>
            <b-form>
                <b-list-group flush>
                    <b-list-group-item>
                        <b-card-body>
                            <b-card-text>
                                <b-form-input
                                        id="forename"
                                        placeholder="First Name"
                                        v-model="forename"
                                        required
                                ></b-form-input>
                            </b-card-text>
                            <b-card-text>
                                <b-form-input
                                        id="surname"
                                        placeholder="Last Name"
                                        v-model="surname"
                                        required
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
                                <b-form-textarea
                                        id="medical"
                                        placeholder="Medical notes..."
                                        v-model="medical"
                                ></b-form-textarea>
                            </b-card-text>
                        </b-card-body>
                    </b-list-group-item>
                    <b-list-group-item id="container-idNumber">
                        <b-button variant="success" class="float-right" @click="addID"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
                        <b-card-title>ID Number</b-card-title>
                        <b-card class="inner-card" id="idNumber" v-for="(add, counter) in idNumber" v-bind:key="counter" no-body>
                            <b-card-body>
                                <b-card-text>
                                    <b-form-input
                                            id="name"
                                            placeholder="ID Type (Driving Licence, Student Card, Passport, etc)"
                                            v-model="add.name"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="value"
                                            placeholder="ID Number"
                                            v-model="add.value"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                            </b-card-body>
                            <b-button size="sm" variant="outline-danger" class="float-right" @click="deleteID(counter)"><font-awesome-icon size="lg" :icon="['fal', 'times']"></font-awesome-icon></b-button>
                        </b-card>
                    </b-list-group-item>
                    <b-list-group-item id="container-phone">
                        <b-button class="float-right" variant="success" @click="addPhone"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
                        <b-card-title>Phone</b-card-title>
                        <b-card class="inner-card" id="phone" v-for="(add, counter) in phone" v-bind:key="counter" no-body>
                            <b-card-body>
                                <b-card-text>
                                    <b-form-input
                                            id="phone"
                                            placeholder="Phone Number"
                                            v-model="phone[counter]"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                            </b-card-body>
                            <b-button size="sm" variant="outline-danger" class="float-right" @click="deletePhone(counter)"><font-awesome-icon size="lg" :icon="['fal', 'times']"></font-awesome-icon></b-button>
                        </b-card>
                    </b-list-group-item>
                    <b-list-group-item id="container-address">
                        <b-button variant="success" class="float-right" @click="addAddress"><font-awesome-icon size="lg" :icon="['fal', 'plus']"></font-awesome-icon></b-button>
                        <b-card-title>Address</b-card-title>
                        <b-card class="inner-card" id="address" v-for="(add, counter) in address" v-bind:key="counter" no-body>
                            <b-card-body>
                                <b-card-text>
                                    <b-form-input
                                            id="line1"
                                            placeholder="Line 1"
                                            v-model="add.line1"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="line2"
                                            placeholder="Line 2"
                                            v-model="add.line2"
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="town"
                                            placeholder="Town"
                                            v-model="add.town"
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="county"
                                            placeholder="County"
                                            v-model="add.county"
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="country"
                                            placeholder="Country"
                                            v-model="add.country"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                                <b-card-text>
                                    <b-form-input
                                            id="postcode"
                                            placeholder="Post Code"
                                            v-model="add.postcode"
                                            required
                                    ></b-form-input>
                                </b-card-text>
                            </b-card-body>
                            <b-button size="sm" variant="outline-danger" class="float-right" @click="deleteAddress(counter)"><font-awesome-icon size="lg" :icon="['fal', 'times']"></font-awesome-icon></b-button>
                        </b-card>
                    </b-list-group-item>
                    <b-button variant="primary" @click="onSubmit" :disabled="!loaded">Submit</b-button>
                </b-list-group>
            </b-form>
        </b-card>
    </div>
</template>

<script>
    import axios from "axios";
    import JWTManager from "../../../components/JWTManager";
    import config from "../../../../config";
    export default {
        name: "EditUser",
        props: ["user", "closeButton"],
        components: {},
        data() {
            return {
                loaded: false,
                processing: false,
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
            getSelf(){
                axios({
                    method: 'get',
                    url: config.apiUrl + '/users/me',
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
            addAddress(){
                this.address.push({
                    line1: '',
                    line2: '',
                    town: '',
                    county: '',
                    country: '',
                    postcode: ''
                });
            },
            deleteAddress(counter){
                this.address.splice(counter, 1);
            },
            addPhone(){
                this.phone.push('');
            },
            deletePhone(counter){
                this.phone.splice(counter, 1);
            },
            addID(){
                this.idNumber.push({
                    name: '',
                    value: ''
                });
            },
            deleteID(counter){
                this.idNumber.splice(counter, 1);
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
        computed: {
        },
        created() {
            if(this.user.ice != null){
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
                this.getSelf();
                this.loaded = true;
            }
        }
    }
</script>

<style scoped>
    .inner-card{
        margin-top: 1.0rem;
        margin-bottom: 1.0rem;
    }
</style>