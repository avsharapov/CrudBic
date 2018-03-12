package ru.letnes.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "bnkseektable")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BNKSEEKTable implements IEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "BNKSEEK_ID_GENERATOR", sequenceName = "bnkseek_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BNKSEEK_ID_GENERATOR")
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(name = "real")
    private String real;

    @ManyToOne
    @JoinColumn(name = "pzn")
    private PZNTable pzn;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "uer", nullable = false)
    private UERTable uer;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "rgn", nullable = false)
    private REGTable rgn;

    @Column(name = "ind")
    private String ind;

    @ManyToOne
    @JoinColumn(name = "tnp")
    private TNPTable tnp;

    @Column(name = "nnp")
    private String nnp;

    @Column(name = "adr")
    private String adr;

    @Column(name = "rkc")
    private String rkc;

    @NotNull
    @Column(name = "namep", nullable = false)
    private String namep;

    @NotNull
    @Column(name = "newnum", unique = true, nullable = false)
    private String newnum;

    @Column(name = "telef")
    private String telef;

    @Column(name = "regn")
    private String regn;

    @Column(name = "okpo")
    private String okpo;

    @NotNull
    @Column(name = "dt_izm", nullable = false)
    private Date dt_izm;

    @Column(name = "ksnp")
    private String ksnp;

    @NotNull
    @Column(name = "date_in", nullable = false)
    private Date date_in;

    @Column(name = "date_ch")
    private Date date_ch;

}
