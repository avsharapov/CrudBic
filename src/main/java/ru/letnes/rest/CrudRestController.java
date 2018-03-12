package ru.letnes.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.letnes.model.IEntity;
import ru.letnes.service.iService;

import java.util.List;
import java.util.Map;

public abstract class CrudRestController<T extends IEntity> extends ErrorHandlingController {

    public abstract iService<T> getService();

    @RequestMapping(value = "/all", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.GET)
    public ResponseEntity<List<T>> listAll() {
        return new ResponseEntity<>(getService().list(), HttpStatus.OK);
    }

    @RequestMapping(value = "/findById/{id}", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.GET)
    public ResponseEntity<T> findById(@PathVariable(value="id") Long id) {
        return new ResponseEntity<>(getService().findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
        getService().delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/add", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.POST)
    public ResponseEntity add(@RequestBody Map<String, Object> newEntityValues) {
        getService().add(newEntityValues);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/update/{id}", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.POST)
    public ResponseEntity update(@PathVariable Long id, @RequestBody Map<String, Object> updatedFields) {
        getService().update(id, updatedFields);
        return new ResponseEntity(HttpStatus.OK);
    }
}
