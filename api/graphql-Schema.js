const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        login(input : LRInput) : Token!,
        getUsers : [User]!,
        getProduct : [product]!
    }

    type Mutation {
        register(input : LRInput) : operation!,
        multimedia(file : Upload!) : UploadFile!,
        category(input : InputCategory) : operation!,
        survey(input : InputSurvey) : operation!,
        brand(input : InputBrand) : operation!,
        product(input : InputProduct) : operation!,
        productSpecs(input : InputProductSpecs) : operation!,
        productSpecsDetails(input : InputProductSpecsDetails) : operation!
        productDetailsValue(input : InputProductDetailsValue) : operation!
    }

    input InputProductSpecs {
        category : ID!,
        specs : String!,
        label : String
    }

    input InputProductSpecsDetails {
        specs : ID!,
        name : String!,
        label : String
    }

    input InputProductDetailsValue {
        p_details : ID!,
        value : String!,
        label : String
    }

    input InputProduct {
        fname : String!,
        ename : String!,
        details : [InputDetails!]!,
        image : [String!]!
    }

    input InputDetails {
        p_details : ID!,
        value : String!,
        label : String
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
        email : String,
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
        phone : String!,
        email : String,
        password : String!,
    }

    type UploadFile {
        name : String!,
        attribute : String,
        dimwidth : String,
        dimheight : String,
        dir : String!
    }

    type product {
        fname : String!,
        ename : String!,
        details : [ID!]!,
        image : [String!]!
    }
`;

module.exports = typeDefs;