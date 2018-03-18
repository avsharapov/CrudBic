package ru.letnes.model.converters;

import org.apache.commons.beanutils.Converter;
import ru.letnes.repositories.iUerRepository;

public class UERConverter implements Converter {

    private iUerRepository uerRepository;

    public UERConverter(iUerRepository uerRepository) {
        this.uerRepository = uerRepository;
    }

    @Override
    public <T> T convert(Class<T> aClass, Object o) {
        if (o != null) {
            return aClass.cast(uerRepository.findByUer((String)o));
        }
        return null;
    }
}
