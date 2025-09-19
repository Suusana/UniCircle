package com.unicircle.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

//convert the date to db, bcz JPA cannot recognize it
@Converter(autoApply = true)
public class LocalDateConverter implements AttributeConverter<LocalDate, String> {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    @Override
    public String convertToDatabaseColumn(LocalDate attribute) {
        return attribute != null ? attribute.format(FORMATTER) : null;
    }

    @Override
    public LocalDate convertToEntityAttribute(String dbData) {
        return dbData != null ? LocalDate.parse(dbData, FORMATTER) : null;
    }
}

