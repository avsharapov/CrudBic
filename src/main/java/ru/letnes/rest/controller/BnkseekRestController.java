package ru.letnes.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.letnes.model.BNKSEEKTable;
import ru.letnes.rest.CrudRestController;
import ru.letnes.service.iService;


@Controller
@RequestMapping("/bnkseek")
public class BnkseekRestController extends CrudRestController<BNKSEEKTable> {

    @Autowired
    private iService<BNKSEEKTable> bnkseekService;

    @Override
    public iService<BNKSEEKTable> getService() {
        return bnkseekService;
    }

    @RequestMapping(value = "/reset", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity reset() {
        bnkseekService.dropAllData();
        bnkseekService.resetSecondTable();
        bnkseekService.resetFirstTable();
        return new ResponseEntity(HttpStatus.OK);
    }
}
