package ru.letnes.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;

@Slf4j
abstract class ErrorHandlingController {

    /**
     * Handles all unknown unexpected exceptions that can happen during WS call.
     * @param exception объект Exception
     * @param response запрос в рамках которого произошло исключение
     * @return ErrorDTO универсальный ответ для ситуаций с исключениями
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorDTO handleExceptions(Exception exception, HttpServletResponse response) {
        log.error("[ErrorHandlingController]", exception);
        return new ErrorDTO("Внутренняя ошибка сервера", exception.getMessage());
    }
}
