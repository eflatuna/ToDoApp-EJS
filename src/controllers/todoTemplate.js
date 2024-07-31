"use strict";
/*
    EXPRESSJS 
    ! TODO CONTROLLER
*/

const Todo = require("../models/todoModel");

module.exports = {
	list: async (req, res) => {
		const data = await Todo.findAndCountAll();

		res.render("todoList", { data });
	},
	create: async (req, res) => {
		if (req.method === "GET") {
			res.render("todoCreate");
		} else {
			const data = await Todo.create(req.body);
			res.redirect("/view"); //*yönlendirme icin kullanilan method. route adini yaziyoruz.
		}
	},
};
