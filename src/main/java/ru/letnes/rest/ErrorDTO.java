package ru.letnes.rest;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
class ErrorDTO {
    @NonNull
    private final String title;
    @NonNull
    private final String message;
}
