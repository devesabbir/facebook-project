import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    first_name: {
        type: String,
    },

    sur_name:{
      type: String,
    },

    username: {
        type: String,
    },

    secondary_name:{
        type: String,
    },

    email :{
        type: String,
    },

    phone : { 
        type: String,
    },

    password : {
      type: String,
      required: true,
    },

    profile_photo: {
       type: String,
       default: 'avatar'
    },

    cover_photo: {
       type:String,
       default: 'cover'
    },

    gender : {
     type: String,
     enum : ['male', 'female', 'other'],
    },
   
    birth_date : {
      type: String,
    },

   birth_month : {
    type: String,
   },
   
   birth_year : {
    type: String,
   },

   profile_photo : {
     type: String,
     default: 'photo'
   },

   cover_photo : {
      type: String,
      default: 'photo'
   },

   bio :{
     type: String,
   },

   hobbies: {
      type: Array,
   } ,

   work : {
      type: Array,
   },

   education : {
      type: Array,
   },

   featured : {
     type: Array,
   },

   living : {
      type: Array,
   },

   relationship : {
      type: Array,
   },

   joined : {
      type: Array,
   },

   social_links : {
      type: Array,
   },

   isActivate: {
      type: Boolean,
      default: false,
   },
   
   isVerify: {
      type: Boolean,
      default: false,
   },

   access_token: {
      type: String,
      default: null
   },

   friends: {
     type: Array,
   },

   following: {
     type: Array,
   },

   followers: {
     type: Array,
   }, 

   request : {
     type: Array,
   },

   block : {
     type: Array,
   },

   posts : {
    type: Array,
   }

}, {
    timestamps:true
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;