package ru.letnes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "uertable")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UERTable implements IEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "UER_ID_GENERATOR", sequenceName = "uer_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "UER_ID_GENERATOR")
    @Column(unique = true, nullable = false)
    private Long id;

    @NotNull
    @Column(name = "uer", nullable = false, unique = true)
    private String uer;

    @NotNull
    @Column(name = "uername", nullable = false)
    private String uername;

}
