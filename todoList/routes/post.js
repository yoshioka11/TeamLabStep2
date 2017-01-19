var express = require('express');


exports.index = function(req,res){
  res.render('index');
}

exports.show = function(req,res){
  res.render('show',{id:req.params.id});
}

exports.searchTodo = function(req,res){
  res.render('search');
}
