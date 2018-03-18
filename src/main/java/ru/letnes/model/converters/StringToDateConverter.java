package ru.letnes.model.converters;

import org.apache.commons.beanutils.Converter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class StringToDateConverter implements Converter {


    private final static String DEFAULT_DATE_PATTERN = "dd.MM.yyyy";

    private DateFormat dateFormat;

    public StringToDateConverter() {
        this.dateFormat = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
        this.dateFormat.setLenient(false);

    }

    @Override
    public <T> T convert(Class<T> aClass, Object o) {
        if (o != null) {
            String s = (String)o;
            if(s.isEmpty()) {
                return null;
            }
            try {
                return aClass.cast(dateFormat.parse(s));
            } catch (ParseException e) {
                String pattern;
                if (dateFormat instanceof SimpleDateFormat) {
                    pattern = ((SimpleDateFormat) dateFormat).toPattern();
                } else {
                    pattern = dateFormat.toString();
                }
                throw new IllegalArgumentException(e.getMessage() + ", format: [" + pattern + "]");
            }
        }
        return null;
    }
}
