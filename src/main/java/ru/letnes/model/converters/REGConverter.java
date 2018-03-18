package ru.letnes.model.converters;

import org.apache.commons.beanutils.Converter;
import ru.letnes.repositories.iRegRepository;

public class REGConverter implements Converter {

    private iRegRepository regRepository;

    public REGConverter(iRegRepository regRepository) {
        this.regRepository = regRepository;
    }

    @Override
    public <T> T convert(Class<T> aClass, Object o) {
        if (o != null) {
            return aClass.cast(regRepository.findByRgn((String) o));
        }
        return null;
    }
}
