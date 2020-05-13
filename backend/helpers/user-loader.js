const User = require('../models/user');
const IceUser = require('../models/ice-user');
const ServiceUser = require('../models/service-user');
const Organisation = require('../models/organisation');
const config = require('../config');

async function get_all(user) {
    let json = {};
    IceUser.findById(user.id)
        .then(iceuser => {
            if(iceuser){
                    json["forename"] = iceuser.forename;
                    json["surname"] = iceuser.surname;
                    json["dob"] = iceuser.dob;
                    json["phone"] = iceuser.phone;
                    json["address"] = iceuser.address;
                    json["medical"] = iceuser.media;
                    json["contacts"] = iceuser.contacts;
                    json["id_number"] = iceuser.idNumber;
            }
        })
        .then(() => {
            ServiceUser.findById(user.id)
                .then(serviceuser => {
                    if(serviceuser){
                        json.service["staff_id"] = serviceuser.staffID;
                        json.service["rank"] = serviceuser.rank;
                        return json;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                })
        })
        .catch(err => {
            throw new Error(err);
        });
}

function has_permission(user) {
    ServiceUser.findById(user)
        .then(serviceUser => {
            if(serviceUser && check_service_email(req.user)){
                return true;
            } else {
                Organisation.findOne({"domain": config.app.domain})
                    .then(org => {
                        return org.staff.contains(user) || org.admin.contains(user);
                    })
                    .catch(() => {
                        return false;
                    });
            }
        })
        .catch(() => {
            return false;
        });
}

function has_staff_permission(user) {
    Organisation.findOne({"domain": config.app.domain})
        .then(org => {
            return org.staff.contains(user) || org.admin.contains(user);
        })
        .catch(() => {
            return false;
        });
}

async function put_ice(data){
    return IceUser.findOneAndUpdate({user: data.user}, data, {new: true})
        .then(ice => {
            if(!ice){
                ice = IceUser(data);
            }
            return ice.save();
        });
}

async function put_service(data){
    return ServiceUser.findOneAndUpdate({user: data.user}, data, {new: true})
        .then(service => {
            if(!service){
                service = ServiceUser(data);
            }
            return service.save();
        });
}

function check_service_email(user){
    let verified = false;
    config.service.domains.forEach(domain => {
        if(user.email.toString().toLowerCase().endsWith(domain.toLowerCase())){
            verified = true;
        }
    })
    return verified;
}

module.exports = {
    get_all : get_all,
    has_permission : has_permission,
    has_staff_permission : has_staff_permission,
    put_ice : put_ice,
    put_service : put_service,
    check_service_email : check_service_email
}