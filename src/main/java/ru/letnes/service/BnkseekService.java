package ru.letnes.service;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.jamel.dbf.processor.DbfProcessor;
import org.jamel.dbf.processor.DbfRowMapper;
import org.jamel.dbf.utils.DbfUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import ru.letnes.model.*;
import ru.letnes.repositories.*;

import java.io.File;
import java.io.Serializable;
import java.nio.charset.Charset;
import java.util.*;

@Slf4j
@Transactional(readOnly = true)
@org.springframework.stereotype.Service("BnkseekService")
public class BnkseekService implements iService<BNKSEEKTable>, Serializable {
    private static final long serialVersionUID = 1L;

    @Autowired
    iBnkseekRepository bnkseekRepository;
    @Autowired
    iRegRepository regRepository;
    @Autowired
    iTnpRepository tnpRepository;
    @Autowired
    iUerRepository uerRepository;
    @Autowired
    iPznRepository pznRepository;

    @Override
    public List<BNKSEEKTable> list() {

        return Lists.newArrayList(bnkseekRepository.findAll());
    }

    @Override
    @Transactional()
    public void add(BNKSEEKTable entity) {
        bnkseekRepository.save(entity);
    }

    @Override
    @Transactional()
    public void add(Map<String, Object> newEntityValues) {
        try {
            BNKSEEKTable newEntity = BNKSEEKTable.builder().build();
            BeanUtils.copyProperties(newEntity, newEntityValues);
            add(newEntity);
        } catch (Exception e) {
            log.error("Error while creating new Entity!", e);
        }
    }

    @Override
    @Transactional()
    public void update(Long id, Map<String, Object> updatedFields) {
        BNKSEEKTable old = bnkseekRepository.findOne(id);
        try {
            BeanUtils.copyProperties(old, updatedFields);
            bnkseekRepository.save(old);
        } catch (Exception e) {
            log.error("Error while updating entity!", e);
        }
    }

    @Override
    @Transactional()
    public void update(BNKSEEKTable entity) {
        bnkseekRepository.save(entity);
    }

    @Override
    @Transactional()
    public void delete(Long id) {
        bnkseekRepository.delete(id);
    }

    @Override
    public BNKSEEKTable findById(Long id) {
        return bnkseekRepository.findOne(id);
    }

    @Override
    public long count() {
        return bnkseekRepository.count();
    }

    @Override
    public Map<String, Object> getAdditional() {
        Map<String, Object> stringIEntityHashMap = new HashMap<>();
        stringIEntityHashMap.put("pzn", Lists.newArrayList(pznRepository.findAll()));
        stringIEntityHashMap.put("tnp", Lists.newArrayList(tnpRepository.findAll()));
        stringIEntityHashMap.put("uer", Lists.newArrayList(uerRepository.findAll()));
        stringIEntityHashMap.put("reg", Lists.newArrayList(regRepository.findAll()));
        return stringIEntityHashMap;
    }

    @Transactional()
    public void resetFirstTable() {
        ClassLoader classLoader = getClass().getClassLoader();
        File bnkseek = new File(Objects.requireNonNull(classLoader.getResource("rawData/BNKSEEK.DBF")).getFile());
        List<BNKSEEKTable> listBnkSeek = DbfProcessor.loadData(bnkseek, new DbfRowMapper<BNKSEEKTable>() {
            @Override
            public BNKSEEKTable mapRow(Object[] row) {
                return BNKSEEKTable.builder()
                        .real(obtainString(row[1]))
                        .pzn(pznRepository.findByPzn(obtainString(row[2])))
                        .uer(uerRepository.findByUer(obtainString(row[3])))
                        .rgn(regRepository.findByRgn(obtainString(row[4])))
                        .ind(obtainString(row[5]))
                        .tnp(tnpRepository.findByTnp(obtainString(row[6])))
                        .nnp(obtainString(row[7]))
                        .adr(obtainString(row[8]))
                        .rkc(obtainString(row[9]))
                        .namep(obtainString(row[10]))
                        .newnum(obtainString(row[12]))
                        .telef(obtainString(row[18]))
                        .regn(obtainString(row[19]))
                        .okpo(obtainString(row[20]))
                        .dt_izm(obtainDate(row[21]))
                        .ksnp(obtainString(row[23]))
                        .date_in(obtainDate(row[24]))
                        .date_ch(obtainDate(row[25]))
                        .build();
            }
        });
        bnkseekRepository.save(listBnkSeek);
    }

    @Transactional()
    public void resetSecondTable() {
        ClassLoader classLoader = getClass().getClassLoader();
        File pzn = new File(Objects.requireNonNull(classLoader.getResource("rawData/PZN.DBF")).getFile());
        List<PZNTable> listPznTable = DbfProcessor.loadData(pzn, new DbfRowMapper<PZNTable>() {
            @Override
            public PZNTable mapRow(Object[] row) {
                return PZNTable.builder()
                        .pzn(obtainString(row[1]))
                        .name(obtainString(row[3]))
                        .build();
            }
        });
        pznRepository.save(listPznTable);
        File tnp = new File(Objects.requireNonNull(classLoader.getResource("rawData/TNP.DBF")).getFile());
        List<TNPTable> listTnpTable = DbfProcessor.loadData(tnp, new DbfRowMapper<TNPTable>() {
            @Override
            public TNPTable mapRow(Object[] row) {
                return TNPTable.builder()
                        .tnp(obtainString(row[1]))
                        .fullname(obtainString(row[2]))
                        .build();
            }
        });
        tnpRepository.save(listTnpTable);
        File uer = new File(Objects.requireNonNull(classLoader.getResource("rawData/UER.DBF")).getFile());
        List<UERTable> listUerTable = DbfProcessor.loadData(uer, new DbfRowMapper<UERTable>() {
            @Override
            public UERTable mapRow(Object[] row) {
                return UERTable.builder()
                        .uer(obtainString(row[1]))
                        .uername(obtainString(row[2]))
                        .build();
            }
        });
        uerRepository.save(listUerTable);
        File reg = new File(Objects.requireNonNull(classLoader.getResource("rawData/REG.DBF")).getFile());
        List<REGTable> listRegTable = DbfProcessor.loadData(reg, new DbfRowMapper<REGTable>() {
            @Override
            public REGTable mapRow(Object[] row) {
                return REGTable.builder()
                        .rgn(obtainString(row[1]))
                        .name(obtainString(row[2]))
                        .center(obtainString(row[3]))
                        .build();
            }
        });
        regRepository.save(listRegTable);
    }

    @Transactional()
    public void dropAllData() {
        pznRepository.deleteAll();
        tnpRepository.deleteAll();
        uerRepository.deleteAll();
        regRepository.deleteAll();
        bnkseekRepository.deleteAll();
        bnkseekRepository.restartSequence();
        pznRepository.restartSequence();
        tnpRepository.restartSequence();
        uerRepository.restartSequence();
        regRepository.restartSequence();
    }

    private Date obtainDate(Object bytes) {
        return ((Date) bytes).getYear() < (new Date()).getYear() ? (Date) bytes : null;
    }

    private String obtainString(Object bytes) {
        return new String(DbfUtils.trimLeftSpaces((byte[]) bytes), Charset.forName("cp866"));
    }
}
