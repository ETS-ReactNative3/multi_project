const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Query {
        login(input : LRInput) : Token!,
        getUsers : [User]!
    }

    type Mutation {
        register(input : LRInput) : operation!,
        multimedia(file : Upload!) : UploadFile!,
        category(input : InputCategory) : operation!,
        survey(input : InputSurvey) : operation!,
        brand(input : InputBrand) : operation!,
        product(input : InputPro) : operation!,
        productdetails(input : InputProductDetails) : operation!
    }

    input InputProductDetails {
        category : ID!,
        name : String!,
        description : String!
    }

    input InputPro {
        att : [inp!]
    }

    input inp {
        fname : String,
        lname : String
    }

    input InputBrand {
        category : ID!,
        name : String!,
        label : String,
        image : String!
    }

    input InputSurvey {
        categroy : ID!,
        name : String!,
        label : String
    }

    input InputCategory {
        name : String!,
        label : String,
        parent : ID,
        subcategory : ID
    }

    type operation {
        status : Int,
        message : String
    }

    input LRInput {
        fname : String,
        lname : String,
        code : Int,
        number : String,
        birthday : String,
        gender : Gender,
        phone : String!,
        password : String!,
    }

    enum Gender {
        Male,
        Female
    }

    type Token {
        token : String!
    }

    type User {
        fname : String,
        lname : String,
        code : Int,
        number : String,
        birthday : String,
        gender : Gender,
        phone : String,
        password : String,
    }

    type UploadFile {
        name : String!,
        attribute : String,
        dimwidth : String,
        dimheight : String,
        dir : String!
    }

`;

module.exports = typeDefs;