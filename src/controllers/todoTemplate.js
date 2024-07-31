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
			console.log(req.body);
			if (req.body.isDone) {
				req.body.isDone = true;
			}
			const data = await Todo.create(req.body);
			res.redirect("/view"); //*yönlendirme icin kullanilan method. route adini yaziyoruz.
		}
	},
	read: async (req, res) => {
		const data = await Todo.findByPk(req.params.todoId);
		res.render("todoRead", { todo: data.dataValues });
	},
	update: async (req, res) => {
		if (req.method == "GET") {
			const data = await Todo.findByPk(req.params.todoId);
			res.render("todoUpdate", { todo: data.dataValues });
		} else {
			const data = await Todo.update(req.body, {
				where: { id: req.params.todoId },
			});
			res.redirect("/view");
		}
	},
	delete: async (req, res) => {
		const data = await Todo.destroy({ where: { id: req.params.todoId } });
		if (data === 1) {
			res.redirect("/view");
		} else {
			throw new Error("todo not found ");
		}
	},
};
