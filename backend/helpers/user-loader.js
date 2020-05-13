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
            if(serviceUser){
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

async function put_ice(user, data){
    return IceUser.findOneAndUpdate({user: user}, data, {new: true})
        .then(ice => {
            if(!ice){
                data.user = user.id;
                ice = IceUser(data);
                ice.save();
            }
            console.log(ice);
            return ice;
        })
        .catch(err => {
            console.log(err);
        });
}

async function put_service(user, data){
    return ServiceUser.findOneAndUpdate({user: user}, data, {new: true})
        .then(service => {
            if(!service){
                data.user = user.id;
                service = ServiceUser(data);
            }
            return service.save();
        });
}

function check_ice_payload(req){

}

function check_service_payload(req){
    if(req.body.staffID && req.body.rank){
        return {
            "staffID": req.body.staffID,
            "rank": req.body.rank
        }
    }
}

module.exports = {
    get_all : get_all,
    has_permission : has_permission,
    has_staff_permission : has_staff_permission,
    put_service : put_service,
    check_service_payload : check_service_payload
}