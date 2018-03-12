package ru.letnes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "regtable")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class REGTable implements IEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "REG_ID_GENERATOR", sequenceName = "reg_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REG_ID_GENERATOR")
    @Column(unique = true, nullable = false)
    private Long id;

    @NotNull
    @Column(name = "rgn", nullable = false, unique = true)
    private String rgn;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "center")
    private String center;

}
