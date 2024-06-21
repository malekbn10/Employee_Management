
const { Employee } = require('../model/employe');
const { employeeSchema } = require('../helpers/schema-validation');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

router.delete('/:id', async (req, res) => {
res.send("hey");
    // Employee.findByIdAndDelete(req.params.id).then(employe => {
    //     if (employe) {
    //         return res.status(200).json({ success: true, messaage: 'Employee successfully removed' })
    //     } else {
    //         return res.status(404).json({ success: false, message: 'Employee not found' })
    //     }
    // }).catch(err => {

    //     return res.status(400).json({ success: false, error: err })
    // })
});

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Employee Id')
    }
    try {
        const data = await employeeSchema.validateAsync(req.body);
        let employe = await Employee.findByIdAndUpdate(req.params.id, {
            name: data.name,
            email: data.email,
            position: data.position,
            department: data.department,
            salary: data.salary,
        },
            { new: true }
        );

        if (!employe) {
            res.status(404).send('the employee cannot be updated!');
            return;
        }
        res.send(product);
    } catch (error) {
        //sending an error message if there's an internal server error
        res.status(500).json({ success: false, error: 'Internal server error1' });

    }

});




//Route for creating a new employee
router.post('/', async (req, res) => {
    try {
        //validating data 
        const data = await employeeSchema.validateAsync(req.body);
        //Creating an employee instance
        let employee = new Employee({
            name: data.name,
            email: data.email,
            position: data.position,
            department: data.department,
            salary: data.salary,
        });
        //saving the employee
        employee = await employee.save();
        //verification if the employee cannot be registred
        if (!employee) return res.status(400).send("employee cannot be registered");
        //sending a confirmation message
        res.status(201).json({
            "success": true,
            "message": "Employee registered successfully"
        });
    } catch (error) {
        //sending an error message if there's an internal server error
        res.status(500).json({ success: false, error: 'Internal server error' });

    }

});

//Route to get all the emplyees
router.get('/', async (req, res) => {

    try {
        //finding the employees
        const employeeList = await Employee.find();
        if (!employeeList) {
            //sending an error message if there's no employee
            return res.status(500).json({ success: false, message: 'No employee is found ' });
        }
        //Display all the employees
        res.send(employeeList);
    } catch (error) {
        //sending an error message if there's an internal server error
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});




module.exports = router;
