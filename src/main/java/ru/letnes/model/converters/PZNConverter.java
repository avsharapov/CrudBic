package ru.letnes.model.converters;

import org.apache.commons.beanutils.Converter;
import ru.letnes.repositories.iPznRepository;

public class PZNConverter implements Converter {

    private iPznRepository pznRepository;

    public PZNConverter(iPznRepository pznRepository) {
        this.pznRepository = pznRepository;
    }

    @Override
    public <T> T convert(Class<T> aClass, Object o) {
        if (o != null) {
            return aClass.cast(pznRepository.findByPzn((String)o));
        }
        return null;
    }
}
