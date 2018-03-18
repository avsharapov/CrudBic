package ru.letnes.model.converters;

import org.apache.commons.beanutils.Converter;
import ru.letnes.repositories.iTnpRepository;

public class TNPConverter implements Converter {

    private iTnpRepository tnpRepository;

    public TNPConverter(iTnpRepository tnpRepository) {
        this.tnpRepository = tnpRepository;
    }

    @Override
    public <T> T convert(Class<T> aClass, Object o) {
        if (o != null) {
            return aClass.cast(tnpRepository.findByTnp((String)o));
        }
        return null;
    }
}
